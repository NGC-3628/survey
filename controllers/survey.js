import Survey from "../models/model.js";

// GET ALL
export const getAllSurveys = async (req, res) => {
  try {
    const surveys = await Survey.find();
    res.json(surveys);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET BY ID
export const getSurveyById = async (req, res) => {
  try {
    const survey = await Survey.findById(req.params.id);
    if (!survey) return res.status(404).json({ message: 'Survey not found' });
    res.json(survey);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// CREATE
export const createSurvey = async (req, res) => {
  try {
    const { career, transporte, otroTransporte, frecuencia, gasto, tiempo } = req.body;
    const transporteFinal = transporte === 'Otro' ? otroTransporte : transporte;

    const newSurvey = new Survey({
      career,
      transporte: transporteFinal,
      frecuencia,
      gasto,
      tiempo
    });

    const savedSurvey = await newSurvey.save();
    res.status(201).json(savedSurvey); // aquí viene el _id
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// UPDATE
export const updateSurvey = async (req, res) => {
  try {
    const survey = await Survey.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!survey) return res.status(404).json({ message: 'Survey not found' });
    res.json(survey);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// DELETE
export const deleteSurvey = async (req, res) => {
  try {
    const survey = await Survey.findByIdAndDelete(req.params.id);
    if (!survey) return res.status(404).json({ message: 'Survey not found' });
    res.json({ message: `Survey ${req.params.id} deleted` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
