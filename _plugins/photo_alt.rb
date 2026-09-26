# Gives every site-hosted photograph its own description from
# _data/photo_alt.yml, at build time, in dev and production alike.
#
# Templates and old blog posts write their own alt text, and most of it was one
# line repeated for a whole gallery ("Kelly & Dylan wedding florals by Golden
# Flowers" on 33 photos). Rewriting it here instead of in each template means
# one photo reads the same everywhere it appears, and blog posts pasted in as
# raw HTML are covered without editing them. A photo with no entry is left
# exactly as its template wrote it.
module GF
  module PhotoAlt
    IMG_RE = /<img\b[^>]*>/.freeze
    SRC_RE = %r{\ssrc="(/assets/images/[^"?#]+)"}.freeze
    ALT_RE = /\salt="[^"]*"/.freeze

    def self.apply(doc)
      return unless doc.output_ext == ".html" && doc.output
      alts = doc.site.data["photo_alt"]
      return unless alts.is_a?(Hash) && !alts.empty?
      doc.output = doc.output.gsub(IMG_RE) do |tag|
        m = tag.match(SRC_RE)
        text = m && alts[m[1]]
        next tag unless text
        attr = %( alt="#{CGI.escapeHTML(text.to_s)}")
        tag =~ ALT_RE ? tag.sub(ALT_RE, attr) : tag.sub(/\A<img\b/, "<img#{attr}")
      end
    end
  end
end

require "cgi"
Jekyll::Hooks.register [:pages, :documents], :post_render do |doc|
  GF::PhotoAlt.apply(doc)
end
