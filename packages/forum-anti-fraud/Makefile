# 定義
NEXT_PUBLIC_PROJECT_NAME := $(shell grep NEXT_PUBLIC_PROJECT_NAME .env.local | cut -d '=' -f 2 | tr -d "'")
NEXT_PUBLIC_ENV := $(shell grep NEXT_PUBLIC_ENV .env.local | cut -d '=' -f 2 | tr -d "'")

# 檢查環境變數是否正確
check-env:
	@echo "Checking environment..."
	@if [ -z "$(NEXT_PUBLIC_ENV)" ]; then \
		echo "Error: NEXT_PUBLIC_ENV is not set in .env.local."; \
		exit 1; \
	fi
	@if [ "$(NEXT_PUBLIC_ENV)" != "prod" ]; then \
		echo "Error: NEXT_PUBLIC_ENV is set to '$(NEXT_PUBLIC_ENV)', but it should be 'prod'."; \
		exit 1; \
	fi
	@echo "Environment is correctly set to 'prod'."

# 刪除舊的資料夾
delete-old:
	@if [ -z "$(NEXT_PUBLIC_PROJECT_NAME)" ]; then \
		echo "Skipping deletion as NEXT_PUBLIC_PROJECT_NAME is not set."; \
	elif [ ! -d "$(NEXT_PUBLIC_PROJECT_NAME)" ]; then \
		echo "Skipping deletion as '$(NEXT_PUBLIC_PROJECT_NAME)' folder does not exist."; \
	else \
		echo "Deleting old '$(NEXT_PUBLIC_PROJECT_NAME)'..."; \
		rm -rf "$(NEXT_PUBLIC_PROJECT_NAME)"; \
		echo "Successfully deleted '$(NEXT_PUBLIC_PROJECT_NAME)'."; \
	fi


# build起來
build:
	@echo "Building the project..."
	npx next build && npx next export

# 重新命名資料夾
rename:
	@if [ -z "$(NEXT_PUBLIC_PROJECT_NAME)" ]; then \
		echo "Error: NEXT_PUBLIC_PROJECT_NAME is not defined in .env.local."; \
		exit 1; \
	fi
	@if [ ! -d "out" ]; then \
		echo "Error: 'out' folder does not exist. Please run 'make build' first."; \
		exit 1; \
	fi
	@echo "Renaming 'out' folder to '$(NEXT_PUBLIC_PROJECT_NAME)'..."
	mv out $(NEXT_PUBLIC_PROJECT_NAME)

# 預設指令
all: delete-old build rename