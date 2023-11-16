.PHONY: deploy
deploy:
	ENV_VAR_NAME=production docker-compose up --build

.PHONY: development
development:
	ENV_VAR_NAME=development docker-compose up --build
