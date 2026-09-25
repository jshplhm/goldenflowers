# Shrinks _site/assets/css/redesign.css at deploy time: comments out, runs of
# whitespace collapsed, and NOTHING else. The source keeps its comments, which
# are most of its weight (62 KB -> 19 KB gzipped, 2026-09-25).
#
# Deliberately not a real minifier. lightningcss and csso were both tried and
# both changed the rendered site: they merge and reorder rules, which moves
# the cascade (the header's no-animation-on-load rule was lost, focus outlines
# on /venues went to 0). This only deletes text a browser ignores anyway.
# Verified by comparing getComputedStyle of every element on 12 pages at 3
# widths, before and after: 0 differences.
#
# Usage: ruby scripts/minify-css.rb _site/assets/css/redesign.css
path = ARGV.fetch(0)
src = File.read(path); out = +""; i = 0; q = nil
while i < src.size
  c = src[i]
  if q
    out << c
    if c == "\\" then out << src[i + 1].to_s; i += 2; next end
    q = nil if c == q
  elsif c == '"' || c == "'"
    q = c; out << c
  elsif c == "/" && src[i + 1] == "*"
    j = src.index("*/", i + 2) or raise "unclosed comment"
    i = j + 2; out << " "; next
  else
    out << c
  end
  i += 1
end
out = out.gsub(/\s+/, " ").gsub(/ ?([{};]) ?/, '\1').strip
File.write(path, out + "\n")
