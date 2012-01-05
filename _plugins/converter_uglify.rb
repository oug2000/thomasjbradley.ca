module Jekyll
  class UglifyConverter < Converter
    safe true

    priority :low

    def setup
      return if @setup
      require 'uglifier'
      #Stylus.compress = @config['stylus']['compress'] if @config['stylus']['compress']
      @setup = true
    rescue LoadError
      STDERR.puts 'You are missing a library required for Uglify. Please run:'
      STDERR.puts '  $ [sudo] gem install uglifier'
      raise FatalException.new('Missing dependency: uglifier')
    end

    def matches(ext)
      ext =~ /js/i
    end

    def output_ext(ext)
      new_ext = '.min.js'

      if @config['buildtime']
        return '.' + @config['buildtime'] + new_ext
      else
        return new_ext
      end

      new_ext
    end

    def convert(content)
      env = nil

      if Jekyll::EnvFilter
        env = Jekyll::EnvFilterHelper.get_env(@config)
      end

      if env.nil? || @config['env'][env].nil? || @config['env'][env]['compress_js'].nil? || @config['env'][env]['compress_js'] === true
        begin
          setup
          Uglifier.compile(content)
        rescue => e
          puts "Uglify Exception: #{e.message}"
        end
      else
        content
      end
    end
  end
end
