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
