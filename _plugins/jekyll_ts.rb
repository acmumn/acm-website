# Converts typescript files to javascript
#
# Uses the following configs
#		 tsc => path of typescript compiler,
#		 js_dest => output of js files after compilation

# Written by Matt Sheehan, 2015


module Jekyll

	class TsGenerator < Generator
		safe true
		priority :high

		def generate(site)
			# location of typescript compiler
			# defaults to tsc assuming in system env path
			tsc = site.config["tsc"] || "tsc"

			# ts source
			ts_src = site.config["ts-src"] || "/"

			# js destination
			js_dest = site.config["js-dest"] || "/"

			ts_files = Array.new;

			site.static_files.delete_if do |sf|
				next if not File.extname(sf.path) == ".ts"
				
				# get the dirname of file, but we don't need the site source
				ts_dir = File.dirname(sf.path.gsub(site.source, ""))
				ts_name = File.basename(sf.path)

				# add ts file
				ts_files << TsFile.new(site, site.source, ts_dir, ts_name, ts_src, js_dest, tsc)
				# return true so this file gets removed from static_files
				# we'll replace it with our own tsfile that implements
				# it's own write
				true
			end

			# concat new tsfiles with static files
			site.static_files.concat(ts_files)
		end
	end


	class TsFile < StaticFile
		def initialize(site, base, dir, name, tsroot, jsroot, tsc)
			super(site, base, dir, name, nil)

			@tspath = File.join tsroot, name
			@tsdir = File.join base, tsroot
			@jsdir = jsroot
			@tsc = tsc
		end

		def write(dest)
      puts dest
			# js name
			ts_ext = /\.ts$/i
			js_name = @name.gsub(ts_ext, ".js")

			# js full path
			js_path = File.join(dest, @jsdir)
			js = File.join(js_path, js_name)

			# make sure dir exists
			FileUtils.mkdir_p(js_path)
			# execute shell command
			begin
				command = "#{@tsc} -t ES5 --rootDir #{@tsdir} --outDir #{js_path} #{@tspath}"
        puts command

				`#{command}`
			end
		end
	end
end
