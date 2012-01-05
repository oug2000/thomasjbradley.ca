module Jekyll
  class BuildTimeGenerator < Generator
    priority :highest

    def generate(site)
      site.config['buildtime'] = site.time.to_i.to_s
    end
  end
end
