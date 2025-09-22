import express from "express";
import {
  getAllSurveys,
  getSurveyById,
  createSurvey,
  updateSurvey,
  deleteSurvey
} from "../controllers/survey.js";
import { isAuthenticated } from "../middleware/authenticate.js";

const router = express.Router();

/**
 * 🔓 Rutas abiertas
 * - POST /survey → para que cualquier usuario envíe una encuesta
 * - GET /survey/:id → para que un usuario pueda consultar su propia encuesta por ID
 */
router.post("/", createSurvey);
router.get("/:id", getSurveyById);

/**
 * 🔐 Rutas protegidas con login de GitHub (middleware isAuthenticated)
 * - GET /survey → ver todas las encuestas
 * - PUT /survey/:id → actualizar encuesta por ID
 * - DELETE /survey/:id → eliminar encuesta por ID
 */
router.get("/", isAuthenticated, getAllSurveys);
router.put("/:id", isAuthenticated, updateSurvey);
router.delete("/:id", isAuthenticated, deleteSurvey);

export default router;
