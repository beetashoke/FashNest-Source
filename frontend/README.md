# Uniformity Frontend (Vite + React)

## Quickstart

```bash
cd frontend
npm install
npm run dev
```

The dev server proxies API requests to your local Frappe at `http://localhost:8000`. Adjust the target in `vite.config.ts` if needed.

## Build
```bash
npm run build
```
Outputs production assets in `dist/`.

## Deploy options
- Serve `dist/` via Nginx at `/` or a subpath.
- Or copy `dist/` to your server and point a static host to it.
- If serving under a subpath, set `base` in `vite.config.ts` accordingly.

API base used by the app: `/api/method/test_google.google_testing.api`.

