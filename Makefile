.PHONY: dev
dev:
	docker-compose up development --build

.PHONY: prod
prod:
	docker-compose up production --build