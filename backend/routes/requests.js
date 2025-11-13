import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import MaterialRequest from '../models/MaterialRequest.js';

const router = express.Router();

// Multer storage config
const uploadDir = process.env.UPLOAD_DIR || 'uploads';
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const unique = Date.now() + '-' + Math.round(Math.random()*1e9);
    cb(null, unique + path.extname(file.originalname || '.jpg'));
  }
});
const upload = multer({ storage });

// Create new material request (with optional photos)
router.post('/', upload.array('photos', 5), async (req, res) => {
  try {
    const { site, materialType, quantity, unit, requestedBy } = req.body;
    const photos = (req.files || []).map(f => `/uploads/${path.basename(f.path)}`);
    const mr = await MaterialRequest.create({ site, materialType, quantity, unit, requestedBy, photos });
    res.status(201).json(mr);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: 'Failed to create request', details: err.message });
  }
});

// List requests (optional filters: status, site, materialType)
router.get('/', async (req, res) => {
  const { status, site, materialType } = req.query;
  const q = {};
  if (status) q.status = status;
  if (site) q.site = site;
  if (materialType) q.materialType = materialType;
  try {
    const items = await MaterialRequest.find(q).sort({ createdAt: -1 });
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch requests', details: err.message });
  }
});

// Approve request
router.patch('/:id/approve', async (req, res) => {
  try {
    const { comment } = req.body;
    const updated = await MaterialRequest.findByIdAndUpdate(
      req.params.id,
      { status: 'APPROVED', managerComment: comment || '' },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: 'Approve failed', details: err.message });
  }
});

// Reject request
router.patch('/:id/reject', async (req, res) => {
  try {
    const { comment } = req.body;
    const updated = await MaterialRequest.findByIdAndUpdate(
      req.params.id,
      { status: 'REJECTED', managerComment: comment || '' },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: 'Reject failed', details: err.message });
  }
});

// Update status (e.g., DISPATCHED, DELIVERED)
router.patch('/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    if (!['PENDING','APPROVED','REJECTED','DISPATCHED','DELIVERED'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }
    const updated = await MaterialRequest.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: 'Status update failed', details: err.message });
  }
});

// Consumption history: totals by site/material over a period (days)
router.get('/consumption', async (req, res) => {
  const { site, materialType, period = 30 } = req.query;
  const days = Math.max(1, Math.min(3650, parseInt(period, 10) || 30));
  const since = new Date(Date.now() - days*24*60*60*1000);
  const match = { createdAt: { $gte: since }, status: 'DELIVERED' };
  if (site) match.site = site;
  if (materialType) match.materialType = materialType;
  try {
    const agg = await MaterialRequest.aggregate([
      { $match: match },
      { $group: { _id: { site: '$site', materialType: '$materialType', unit: '$unit' },
                  totalQuantity: { $sum: '$quantity' },
                  count: { $sum: 1 } } },
      { $sort: { '_id.site': 1, '_id.materialType': 1 } }
    ]);
    res.json({ since, results: agg });
  } catch (err) {
    res.status(500).json({ error: 'Failed to compute consumption', details: err.message });
  }
});

// Pending request summary: count by site and materialType
router.get('/summary/pending', async (req, res) => {
  try {
    const agg = await MaterialRequest.aggregate([
      { $match: { status: { $in: ['PENDING','APPROVED','DISPATCHED'] } } },
      { $group: { _id: { site: '$site', materialType: '$materialType', status: '$status' }, count: { $sum: 1 } } },
      { $sort: { '_id.site': 1, '_id.materialType': 1 } }
    ]);
    res.json(agg);
  } catch (err) {
    res.status(500).json({ error: 'Failed to generate summary', details: err.message });
  }
});

export default router;
