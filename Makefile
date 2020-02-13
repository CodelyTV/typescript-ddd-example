.PHONY: test run-tests start rebuild ping-mysql deps compile

test:
	@docker exec codelytv-typescript_ddd_skeleton-nodejs make run-tests

deps:
	docker run --rm -i --volume $(pwd):/app sandrokeil/typescript npm install

compile:
	docker run --rm -i --volume $(pwd):/app sandrokeil/typescript npm run build

run-tests:
	npm test

start:
	@docker-compose up -d

rebuild:
	docker-compose build --pull --force-rm --no-cache
	make start

ping-mysql:
	@docker exec codelytv-typescript_ddd_skeleton-mooc-mysql mysqladmin --user=root --password= --host "127.0.0.1" ping --silent
