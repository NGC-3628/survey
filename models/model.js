import mongoose from "mongoose";

const surveySchema = new mongoose.Schema({
  career: { type: String, required: true },
  transporte: { type: String, required: true },
  frecuencia: { type: String, required: true },
  gasto: { type: String, required: true },
  tiempo: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const Survey = mongoose.model('Survey', surveySchema);

export default Survey;
