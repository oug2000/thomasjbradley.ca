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

      url = @context.registers[:site].config['env'][env][input]

      "#{url}"
    end
  end
end

Liquid::Template.register_filter(Jekyll::EnvFilter)
