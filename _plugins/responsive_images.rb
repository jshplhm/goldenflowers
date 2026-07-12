# Adds srcset/sizes to every site-hosted <img> in PRODUCTION builds only.
# The variant files it points at are generated into _site by
# scripts/make-responsive-variants.sh during the deploy workflow -- they are
# never committed to the repo. Dev builds emit the exact same HTML as before,
# so local previews and diff checks are unaffected.
#
# URL scheme: /assets/images/<path>/<name>.jpg ->
#             /assets/images/rsp/<path>/<name>-480w.jpg (and 960w, 1440w)
# Keep WIDTHS in sync with the script.

module GF
  RSP_WIDTHS = [480, 960, 1440].freeze
  IMG_TAG_RE = /<img\b[^>]*>/.freeze
  SRC_RE = %r{src="(/assets/images/[^"]+\.jpe?g)"}i.freeze

  def self.responsive(html)
    html.gsub(IMG_TAG_RE) do |tag|
      next tag if tag.include?("srcset=")
      m = tag.match(SRC_RE)
      next tag unless m
      src = m[1]
      rel = src.sub("/assets/images/", "")
      stem = rel.sub(/\.jpe?g$/i, "")
      # variants are always .jpg regardless of the source extension (see script)
      set = RSP_WIDTHS.map { |w| "/assets/images/rsp/#{stem}-#{w}w.jpg #{w}w" }
      set << "#{src} 2000w"
      if tag =~ /\bsizes="/
        # the template declared how wide this image renders (e.g. gallery
        # tiles are 50vw on phones) — keep it, add only the srcset
        tag.sub(/\A<img\b/, %(<img srcset="#{set.join(', ')}"))
      else
        tag.sub(/\A<img\b/, %(<img srcset="#{set.join(', ')}" sizes="100vw"))
      end
    end
  end
end

Jekyll::Hooks.register [:pages, :documents], :post_render do |item|
  next unless ENV["JEKYLL_ENV"] == "production"
  next unless item.output_ext == ".html" && item.output
  item.output = GF.responsive(item.output)
end
