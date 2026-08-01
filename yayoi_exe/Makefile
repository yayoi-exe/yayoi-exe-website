.PHONY: help dev-up dev-down dev-logs prod-up prod-down prod-logs

# デフォルト: 利用可能なターゲット一覧
help:
	@echo "Usage: make <target>"
	@echo ""
	@echo "開発 (ホットリロード)"
	@echo "  dev-up     docker-compose.dev.yml で起動 (http://localhost:3000)"
	@echo "  dev-down   開発コンテナを停止"
	@echo "  dev-logs   開発コンテナのログ"
	@echo ""
	@echo "本番相当 (nginx)"
	@echo "  prod-up    docker-compose.yml で起動 (http://localhost:8080)"
	@echo "  prod-down  本番相当コンテナを停止"
	@echo "  prod-logs  本番相当コンテナのログ"

dev-up:
	docker compose -f docker-compose.dev.yml up --build

dev-down:
	docker compose -f docker-compose.dev.yml down

dev-logs:
	docker compose -f docker-compose.dev.yml logs -f

prod-up:
	docker compose up --build

prod-down:
	docker compose down

prod-logs:
	docker compose logs -f
