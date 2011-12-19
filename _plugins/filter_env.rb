module Jekyll
  module EnvFilter
    @@env = nil

    def env(input)
      if @@env.nil?
        envfile = File.expand_path(File.dirname(__FILE__) + '/../_env')
        env = 'prod'

        if File.exists?(envfile)
          env = IO.read(envfile).strip!
        end
      end

      if @context.registers[:config]
        url = @context.registers[:config]['env'][env][input]
      else
        url = @context.registers[:site].config['env'][env][input]
      end

      "#{url}"
    end
  end
end

Liquid::Template.register_filter(Jekyll::EnvFilter)
