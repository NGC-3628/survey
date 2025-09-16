import express from "express";
import { getAllSurveys, getSurveyById, createSurvey, updateSurvey, deleteSurvey } from "../controllers/survey.js";

const router = express.Router();

router.get('/', getAllSurveys);
router.get('/:id', getSurveyById);
router.post('/', createSurvey);
router.put('/:id', updateSurvey);
router.delete('/:id', deleteSurvey);

export default router;
