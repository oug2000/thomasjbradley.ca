module Jekyll
  module SiteFilter
    def thispage(input, test, cssclass)
      if input.include? test
        return " class=\"#{cssclass}\""
      end

      ""
    end
  end
end

Liquid::Template.register_filter(Jekyll::SiteFilter)
