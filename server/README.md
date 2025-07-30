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
uv add fastapi --extra standard
uv add psycopg2-binary
uv add --dev ruff
```

3. Start local development

```sh
uv run fastapi dev
```

## Linting and formatting

```sh
uv run ruff check
```

## Create DB Migration Environment

```sh
alembic init alembic
```

Then edit configuration/connection/logging settings in alembic.ini before proceeding.

## DB Migrations

Make sure you create a "revision" of your models and that you "upgrade" your database with that revision every time you change them. As this is what will update the tables in your database. Otherwise, your application will have errors.

* Alembic is already configured to import your SQLModel models from `./app/models.py`.

* After changing a model (for example, adding a column), create a revision, e.g.:

```console
$ alembic revision --autogenerate -m "Added column last_name to User model"
```

* Commit to the git repository the files generated in the alembic directory.

* After creating the revision, run the migration in the database (this is what will actually change the database):

```console
$ alembic upgrade head
```

If you don't want to start with the default models and want to remove them / modify them, from the beginning, without having any previous revision, you can remove the revision files (`.py` Python files) under `./app/alembic/versions/`. And then create a first migration as described above.

## Email Templates

The email templates are in `./app/email-templates/`. Here, there are two directories: `build` and `src`. The `src` directory contains the source files that are used to build the final email templates. The `build` directory contains the final email templates that are used by the application.

Before continuing, ensure you have the [MJML extension](https://marketplace.visualstudio.com/items?itemName=attilabuti.vscode-mjml) installed in your VS Code.

Once you have the MJML extension installed, you can create a new email template in the `src` directory. After creating the new email template and with the `.mjml` file open in your editor, open the command palette with `Ctrl+Shift+P` and search for `MJML: Export to HTML`. This will convert the `.mjml` file to a `.html` file and now you can save it in the build directory.

## OpenAPI

To generate openapi.json:

```sh
uv run python -c "import app.main; import json; print(json.dumps(app.main.app.openapi()))" > ../openapi.json
```

### Development URLs

Development URLs, for local development.

Frontend: http://localhost:3000

Backend: http://localhost:8000

Automatic Interactive Docs (Swagger UI): http://localhost:8000/docs

Automatic Alternative Docs (ReDoc): http://localhost:8000/redoc

Adminer: http://localhost:8080

Traefik UI: http://localhost:8090

MailCatcher: http://localhost:1080
