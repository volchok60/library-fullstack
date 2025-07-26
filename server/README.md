# Server Backend

Biult with FastAPI.

## Setup 

1. Scaffold app

```sh
uv init server
cd server
```

2. Add packages

```sh
uv add ruff
uv add fastapi --extra standard
```

3. Start local development

```sh
uv run fastapi dev
```

## Linting and formatting

```sh
uv run ruff check
```