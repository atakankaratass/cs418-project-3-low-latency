.DEFAULT_GOAL := help

.PHONY: help install format lint typecheck test build validate-env assignment-check experiment-matrix latency-report live-artifacts live-ffmpeg-evidence live-experiment-checklist live-status validate-pr

help:
	@printf "Available targets:\n"
	@printf "  make install           - Install Node dependencies\n"
	@printf "  make format            - Format supported files with Prettier\n"
	@printf "  make lint              - Run ESLint\n"
	@printf "  make typecheck         - Run TypeScript checks\n"
	@printf "  make test              - Run unit and integration tests\n"
	@printf "  make build             - Run production build validation\n"
	@printf "  make validate-env      - Check local environment readiness\n"
	@printf "  make assignment-check  - Validate assignment source coverage\n"
	@printf "  make experiment-matrix - Generate experiment matrix docs\n"
	@printf "  make latency-report    - Generate latency report artifacts\n"
	@printf "  make live-artifacts    - Generate NGINX config and dash.js player\n"
	@printf "  make live-ffmpeg-evidence - Capture FFmpeg DASH build evidence\n"
	@printf "  make live-experiment-checklist - Generate live experiment commands\n"
	@printf "  make live-status       - Generate live validation status report\n"
	@printf "  make validate-pr       - Run strict local validation gate\n"

install:
	npm install

format:
	npx prettier --write .

lint:
	npm run lint

typecheck:
	npm run typecheck

test:
	npm run test

build:
	npm run build

validate-env:
	npm run validate:env

assignment-check:
	npm run assignment:check

experiment-matrix:
	npm run experiment:matrix

latency-report:
	npm run latency:report

live-artifacts:
	npm run live:artifacts

live-ffmpeg-evidence:
	npm run live:ffmpeg-evidence

live-experiment-checklist:
	npm run live:experiment-checklist

live-status:
	npm run live:status

validate-pr:
	npm run validate:push
