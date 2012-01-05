module Jekyll
  class BuildTimeFile < StaticFile
    def write(dest)
      begin
        super(dest)
      rescue
      end

      true
    end
  end

  class BuildTimeGenerator < Generator
    priority :highest

    def generate(site)
      @buildtime_file_name = 'BUILDTIME'
      site.config['buildtime'] = site.time.to_i.to_s

      if not File.exists?(site.dest)
        Dir.mkdir(site.dest)
      end

      file = File.new(File.join(site.dest, @buildtime_file_name), "w")
      file.write(site.config['buildtime'])
      file.close

      site.static_files << Jekyll::BuildTimeFile.new(site, site.dest, "/", @buildtime_file_name)
    end
  end
end
