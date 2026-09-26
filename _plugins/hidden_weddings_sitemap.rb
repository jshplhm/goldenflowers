# A wedding hidden in /edit ("Portfolio order") is noindexed by the layout,
# but jekyll-sitemap reads `sitemap:` from front matter only and cannot see
# _data/portfolio_meta.yml, so the page stayed in sitemap.xml asking to be
# indexed while refusing it (Search Console flags that). This runs after the
# site is read and before the sitemap is generated, and marks those pages
# `sitemap: false`, so hiding stays ONE edit in /edit.
Jekyll::Hooks.register :site, :post_read do |site|
  meta = site.data["portfolio_meta"]
  next unless meta.is_a?(Array)
  hidden = meta.select { |w| w.is_a?(Hash) && w["hidden"] == true }.map { |w| w["slug"] }
  next if hidden.empty?
  site.pages.each do |p|
    p.data["sitemap"] = false if hidden.include?(p.data["portfolio_key"])
  end
end
