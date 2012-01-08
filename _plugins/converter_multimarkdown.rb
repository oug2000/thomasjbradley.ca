# https://github.com/mojombo/jekyll/issues/289#issuecomment-1324256
# https://github.com/djungelvral/jekyll/blob/master/lib/jekyll/converters/multimarkdown.rb

module Jekyll

  class MultiMarkdownConverter < Converter
    safe true

    pygments_prefix "\n"
    pygments_suffix "\n"

    priority :highest

    def setup
      return if @setup
      require 'multimarkdown'
      @setup = true
    rescue LoadError
      STDERR.puts 'You are missing a library required for MultiMarkdown. Please run:'
      STDERR.puts '  $ [sudo] gem install rpeg-multimarkdown'
      raise FatalException.new("Missing dependency: rpeg-multimarkdown")
    end

    def matches(ext)
      ext =~ /mkd/i
    end

    def output_ext(ext)
      ".html"
    end

    def convert(content)
      setup
      MultiMarkdown.new(content).to_html
    end
  end

end
