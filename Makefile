.PHONY: install build dev lint fix-lint check-node clean

NODE_VERSION := $(shell cat .nvmrc)

# Fail early when the active Node is older than the version pinned in .nvmrc
check-node:
	@current=$$(node -v | sed 's/^v//;s/\..*//'); \
	if [ "$$current" -lt "$(NODE_VERSION)" ]; then \
		echo "Node $(NODE_VERSION)+ required, found $$(node -v). Run: nvm use"; \
		exit 1; \
	fi

node_modules: package.json package-lock.json | check-node
	npm install
	@touch node_modules

install: node_modules

build: node_modules
	npm run build

dev: node_modules
	npm run dev

lint: node_modules
	npm run lint

fix-lint: node_modules
	npm run fix-lint

clean:
	rm -rf node_modules
