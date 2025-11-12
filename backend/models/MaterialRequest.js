import mongoose from 'mongoose';

const MaterialRequestSchema = new mongoose.Schema({
  site: { type: String, required: true },
  materialType: { type: String, required: true, enum: ['CEMENT', 'SAND', 'AGGREGATE', 'STEEL', 'BRICKS', 'OTHER'] },
  quantity: { type: Number, required: true, min: 0 },
  unit: { type: String, default: 'Bags' }, // e.g., Bags, Tonnes, CubicFeet
  requestedBy: { type: String, required: true },
  status: { type: String, enum: ['PENDING', 'APPROVED', 'REJECTED', 'DISPATCHED', 'DELIVERED'], default: 'PENDING' },
  managerComment: { type: String },
  photos: [{ type: String }], // file paths
}, { timestamps: true });

export default mongoose.model('MaterialRequest', MaterialRequestSchema);
