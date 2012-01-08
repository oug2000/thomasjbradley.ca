# NAV HELPER
# Adds two Liquid filters to help with highlighting navigation
# onpage: adds a class to an HTML element when the current page matches
# markonpage: wraps the link's text in a <mark> element on the matching page

# HOW TO:

# onpage:
# <nav>
#   <ul>
#     <li{{"current"|onpage:"about":page.url}}>About</li>
#   <ul>
# <nav>
#
# Follows this setup:
# {{"class"|onpage:"match-url":page.url}}

# markonpage:
# <nav>
#   <ul>
#     <li>{{"About"|markonpage:"about":page.url}}</li>
#   <ul>
# <nav>
#
# Follows this setup:
# {{"Text"|onpage:"match-url":page.url}}

module Jekyll
  module NavHelperFilter
    def onpage(cssclass, test, url)
      if url.include? test
        return " class=\"#{cssclass}\""
      end
    end

    def markonpage(text, test, url)
      if url.include? test
        return "<mark>#{text}</mark>"
      end

      text
    end
  end
end

Liquid::Template.register_filter(Jekyll::NavHelperFilter)
