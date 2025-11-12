# Construction Material Request Portal (Node + React + MongoDB)

**Features**
- Create new material requests (with photo attachments)
- Manager approve/reject
- Update and track delivery status (PENDING → APPROVED → DISPATCHED → DELIVERED)
- View material consumption history (DELIVERED totals, by site/material)
- Pending request summary (counts by site/material/status)

## Prereqs
- Node.js 18+
- MongoDB running locally (or Atlas) — set `MONGODB_URI` in `backend/.env`

## Run Backend
```bash
cd backend
cp .env.sample .env
# edit values if needed
npm install
npm run dev
```
Server: http://localhost:4000

## Run Frontend
```bash
cd frontend
npm install
npm run dev
```
UI: http://localhost:5173

## Notes
- File uploads are stored in `backend/uploads` and served at `/uploads/*`.
- This is an unauthenticated demo for simplicity. You can add JWT later.
