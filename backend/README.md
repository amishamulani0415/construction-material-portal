# Construction Material Request Portal — Backend (Node + Express + MongoDB)

## Quick Start
```bash
cd backend
cp .env.sample .env
# edit .env if needed
npm install
npm run dev
```
Server: `http://localhost:4000`

## REST Endpoints
- `POST /api/requests` (multipart/form-data with fields: site, materialType [CEMENT,SAND,AGGREGATE,STEEL,BRICKS,OTHER], quantity, unit, requestedBy; files: photos[])
- `GET /api/requests?status=&site=&materialType=`
- `PATCH /api/requests/:id/approve` body: `{ comment }`
- `PATCH /api/requests/:id/reject` body: `{ comment }`
- `PATCH /api/requests/:id/status` body: `{ status }` (PENDING, APPROVED, REJECTED, DISPATCHED, DELIVERED)
- `GET /api/requests/consumption?site=&materialType=&period=30` (DELIVERED only)
- `GET /api/requests/summary/pending`

Uploads are saved to `/uploads` folder and served at `/uploads/<filename>`.
