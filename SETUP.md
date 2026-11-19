# SBDERS setup

## Requirements

- PHP 8.2+
- Composer
- Node.js and npm
- SQLite (default) or MySQL

## Install

From the project directory:

```bash
composer install
npm install
```

Create `.env` from `.env.example` if it does not exist (`Copy-Item .env.example .env` in PowerShell, or `cp .env.example .env` in Bash), then configure:

```dotenv
APP_NAME=SBDERS
APP_URL=http://127.0.0.1:8000
ADMIN_SEED_EMAIL=admin@sbders.test
ADMIN_SEED_PASSWORD=choose-a-unique-password-of-at-least-12-characters
```

Generate the application key:

```bash
php artisan key:generate
```

SQLite is configured by default and uses `database/database.sqlite`. To use MySQL instead, set `DB_CONNECTION=mysql` and configure `DB_HOST`, `DB_PORT`, `DB_DATABASE`, `DB_USERNAME`, and `DB_PASSWORD` in `.env`; create the database before migrating.

Create the schema and the configured admin account:

```bash
php artisan migrate --seed
```

The seeder will not replace credentials for an existing admin account. Do not commit `.env` or use a shared/default seed password.

## Run locally

Run these in separate terminals:

```bash
npm run dev
php artisan serve
```

Open `http://127.0.0.1:8000`. Password-reset and verification email messages use the `log` mailer by default and can be inspected in `storage/logs/laravel.log`.

Run the test suite with:

```bash
php artisan test
```
