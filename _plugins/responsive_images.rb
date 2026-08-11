# Adds srcset/sizes to every site-hosted <img> in PRODUCTION builds only.
# The variant files it points at are generated into _site by
# scripts/make-responsive-variants.sh during the deploy workflow -- they are
# never committed to the repo. Dev builds emit the exact same HTML as before,
# so local previews and diff checks are unaffected.
#
# URL scheme: /assets/images/<path>/<name>.jpg ->
#             /assets/images/rsp/<path>/<name>-480w.jpg (and 720w, 960w, 1440w)
# Keep WIDTHS in sync with the script.
#
# Only widths NARROWER than the source are offered, and the source is offered
# at its true width rather than a hardcoded 2000w. Both matter: the script no
# longer writes a no-op variant (see its header), so advertising one would be a
# 404, and claiming a 1399px-wide portrait is "2000w" tells the browser a
# bigger option exists than really does.

module GF
  RSP_WIDTHS = [480, 720, 960, 1440].freeze
  IMG_TAG_RE = /<img\b[^>]*>/.freeze
  SRC_RE = %r{src="(/assets/images/[^"]+\.jpe?g)"}i.freeze
  # A <source> inside <picture> already carries srcset=, so the <img> rule
  # below skips it and an art-directed crop escaped the pipeline entirely --
  # the phone home hero was shipping its untouched 301 KB original as the LCP
  # image. This matches only a BARE single-URL srcset (no w/x descriptors,
  # nothing to preserve), which is exactly the art-direction case.
  SOURCE_TAG_RE = /<source\b[^>]*>/.freeze
  SRCSET_BARE_RE = %r{srcset="(/assets/images/[^",\s]+\.jpe?g)"}i.freeze

  # Pixel width read straight out of the JPEG's SOFn marker. Only the header is
  # touched, so this stays cheap over ~320 photos and avoids adding an image
  # library to the build. Memoized; nil means "couldn't tell".
  def self.jpeg_width(path)
    @widths ||= {}
    return @widths[path] if @widths.key?(path)
    @widths[path] = begin
      File.open(path, "rb") do |f|
        break nil unless f.read(2) == "\xFF\xD8".b
        found = nil
        while (b = f.read(1))
          next unless b == "\xFF".b
          m = f.read(1)
          break if m.nil?
          code = m.ord
          next if code == 0xFF || code.zero?          # padding / stuffed byte
          break if code == 0xDA || code == 0xD9       # image data starts; no SOF
          seg = f.read(2)
          break if seg.nil?
          len = seg.unpack1("n")
          # SOF0-SOF15, minus the huffman/arithmetic tables sharing that range
          if (0xC0..0xCF).cover?(code) && ![0xC4, 0xC8, 0xCC].include?(code)
            f.read(1)                                  # sample precision
            f.read(2)                                  # height
            found = f.read(4)&.unpack1("n")            # width (first 2 bytes)
            break
          end
          f.seek(len - 2, IO::SEEK_CUR)
        end
        found
      end
    rescue StandardError
      nil
    end
  end

  # srcset for one source URL, or nil when there is nothing useful to offer:
  # a photo already narrower than the smallest rung, or one whose width we
  # cannot read. Bailing out on an unreadable width matters -- the script sizes
  # its ladder the same way, so guessing here would advertise variants that
  # never get generated. The plain src= is left in place and still works.
  def self.srcset_for(src, source_dir)
    real = jpeg_width(File.join(source_dir, src.sub(%r{\A/}, "")))
    return nil unless real
    stem = src.sub("/assets/images/", "").sub(/\.jpe?g$/i, "")
    widths = RSP_WIDTHS.select { |w| w < real }
    return nil if widths.empty?
    # variants are always .jpg regardless of the source extension (see script)
    set = widths.map { |w| "/assets/images/rsp/#{stem}-#{w}w.jpg #{w}w" }
    set << "#{src} #{real}w"
    set.join(", ")
  end

  def self.responsive(html, source_dir)
    html = html.gsub(IMG_TAG_RE) do |tag|
      next tag if tag.include?("srcset=")
      m = tag.match(SRC_RE)
      next tag unless m
      set = srcset_for(m[1], source_dir)
      next tag unless set
      if tag =~ /\bsizes="/
        # the template declared how wide this image renders (e.g. gallery
        # tiles are 50vw on phones) — keep it, add only the srcset
        tag.sub(/\A<img\b/, %(<img srcset="#{set}"))
      else
        tag.sub(/\A<img\b/, %(<img srcset="#{set}" sizes="100vw"))
      end
    end

    html.gsub(SOURCE_TAG_RE) do |tag|
      m = tag.match(SRCSET_BARE_RE)
      next tag unless m
      set = srcset_for(m[1], source_dir)
      next tag unless set
      tag = tag.sub(SRCSET_BARE_RE, %(srcset="#{set}"))
      tag =~ /\bsizes="/ ? tag : tag.sub(/\A<source\b/, %(<source sizes="100vw"))
    end
  end
end

Jekyll::Hooks.register [:pages, :documents], :post_render do |item|
  next unless ENV["JEKYLL_ENV"] == "production"
  next unless item.output_ext == ".html" && item.output
  item.output = GF.responsive(item.output, item.site.source)
end
