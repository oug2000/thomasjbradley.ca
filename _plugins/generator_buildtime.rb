# BUILD TIME in SECONDS
# Adds a simple option to config that stores the current build number
# Needed to convert site.time to seconds
# Added to config to share with other plugins as well as templates

# HOW TO:
# From within Liquid:
# {{site.buildtime}}

# From within other plugins:
# @config['buildtime']

module Jekyll
  class BuildTimeGenerator < Generator
    priority :highest

    def generate(site)
      site.config['buildtime'] = site.time.to_i.to_s
    end
  end
end
