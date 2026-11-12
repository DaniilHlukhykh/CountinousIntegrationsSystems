# CI/CD новинного сервісу

## CI (GitHub Actions, `.github/workflows/ci-cd.yml`)
Запускається на push та pull request в `main`/`master`. Для `Backend` і `Client`:
1. `npm ci` — інсталювання пакетів
2. `npm run lint` — ESLint
3. `npm run build` — TypeScript → JavaScript

## CD (Render + Neon)
Cyclic і ElephantSQL закрилися, тому використано безкоштовні **Render** (веб-сервіс) та **Neon** (PostgreSQL).

### Одноразове налаштування
1. **Neon**: створити проєкт, скопіювати connection string (`postgres://...`).
2. Завантажити початкову схему (нові міграції очікують старі таблиці `user_entity`/`newspost_entity`):
   `psql "<connection string>" -f Backend/newsdb-backup.sql`
3. **Render**: New → Blueprint → вибрати GitHub-репозиторій (`render.yaml`).
   У змінних середовища задати `DATABASE_URL` = connection string з Neon.
   (`JWT_SECRET` генерується автоматично.)
4. На Render: Settings → Deploy Hook — скопіювати URL.
5. GitHub: Settings → Secrets and variables → Actions → додати:
   - `DATABASE_URL` — connection string з Neon
   - `RENDER_DEPLOY_HOOK_URL` — Deploy Hook з Render

### Як працює
Після мерджу/push в основну гілку й успішного CI job `deploy` виконує міграції
(`npm run migration:run:prod`) на хмарній БД і викликає Deploy Hook — Render
збирає Client та Backend і запускає `npm start`.

### Локально
- `DATABASE_URL` не задано → використовується локальний Postgres через `PGPASSWORD`.
- `npm run build && npm start` у `Backend/`.
