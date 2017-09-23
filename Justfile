build:
	jekyll b
deploy: build
	sudo rsync -Pa _site/ /var/www/acm.umn.edu/ --delete
update:
	git pull
watch:
	jekyll s
