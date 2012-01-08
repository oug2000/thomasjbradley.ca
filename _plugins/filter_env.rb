# ENVIRONMENT HELPER
# Primarily to allow different domains and static domains for local and remote sites
# When Jekyll builds, you can use the Liquid filter to output the correct paths

# 1. Create a file named `_env` and put in it the name of your environment
# 2. Configure your paths in _config.yml
# 3. Use the Liquid filter in your templates
#    <link href="{{"static"|env}}/theme.css" rel="stylesheet">

module Jekyll

  module EnvFilter
    def env(input)
      env = Jekyll::EnvFilterHelper.get_env()

      if @context.registers[:config]
        url = @context.registers[:config]['env'][env][input]
      else
        url = @context.registers[:site].config['env'][env][input]
      end

      "#{url}"
    end
  end

  # Using a separate module to hide this method from liquid
  module EnvFilterHelper
    @@env = nil

    # Helper method to load the env file
    def EnvFilterHelper.get_env(config=nil)
      if @@env.nil?
        envfile = File.expand_path(File.dirname(__FILE__) + '/../_env')
        @@env = 'prod'

        if File.exists?(envfile)
          @@env = IO.read(envfile).strip!
        end
      end

      @@env
    end
  end
end

Liquid::Template.register_filter(Jekyll::EnvFilter)
