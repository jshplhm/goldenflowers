# Gives a page its own share image (og:image / twitter:image) when it has an
# obvious one, instead of the site-wide default in _config.yml (2026-09-26).
# Before this, every page previewed as the same High Camp photograph, so a
# shared Edgewood link or a blog post showed somebody else's wedding.
#
#   wedding page  its opening photograph (hero_photo front matter, the value
#                 /edit's "Make opening photo" writes)
#   venue page    the photograph in _data/venues/<key>.yml hero_photo, using
#                 the same rules as _includes/venue-hero.html
#   blog post     its featured_image
#
# Runs after everything is read and before anything renders, so jekyll-seo-tag
# sees the value exactly as if it had been typed into the front matter. A page
# that sets its own `image:` keeps it.
module GF
  module ShareImage
    def self.default_image(site)
      (site.config["defaults"] || []).each do |d|
        img = d.dig("values", "image")
        return img if img
      end
      nil
    end

    def self.venue_image(site, key)
      hp = site.data.dig("venues", key, "hero_photo")
      return nil unless hp.is_a?(Hash)
      w, p = hp["wedding"].to_s, hp["photo"].to_s
      return "/assets/images/portfolio/#{w}/#{p}" unless w.empty? || p.empty?
      src, credit = hp["src"].to_s, hp["credit"].to_s
      return src unless src.empty? || credit.empty?
      nil
    end

    def self.pick(site, doc)
      d = doc.data
      if d["portfolio_key"] && d["hero_photo"].to_s != ""
        "/assets/images/portfolio/#{d["portfolio_key"]}/#{d["hero_photo"]}"
      elsif d["venue_key"]
        venue_image(site, d["venue_key"])
      elsif d["featured_image"].to_s != ""
        d["featured_image"]
      end
    end
  end
end

Jekyll::Hooks.register :site, :post_read do |site|
  default = GF::ShareImage.default_image(site)
  (site.pages + site.posts.docs).each do |doc|
    current = doc.data["image"]
    next unless current.nil? || current == default
    img = GF::ShareImage.pick(site, doc)
    doc.data["image"] = img if img && File.exist?(File.join(site.source, img))
  end
end
