import express from "express";
import session from "express-session";
import passport from "passport";
import { Strategy as GitHubStrategy } from "passport-github2";
import { initDb as databaseInit } from "./data/database.js";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

// Routers
import surveyRoutes from "./routes/route.js";       // CRUD encuestas
import adminRoutes from "./routes/index_routes.js"; // login/logout admin

dotenv.config();

const app = express();
const port = process.env.PORT || 2700;

// Configurar sesión
app.use(
  session({
    secret: process.env.SESSION_SECRET || "keyboard cat",
    resave: false,
    saveUninitialized: false
  })
);

app.use(passport.initialize());
app.use(passport.session());

// Estrategia de GitHub
const allowedUsers = process.env.ALLOWED_USERS?.split(",") || [];
passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: process.env.GITHUB_CALLBACK_URL
    },
    (accessToken, refreshToken, profile, done) => {
      // Verificar si el usuario está autorizado
      if (!allowedUsers.includes(profile.username)) {
        return done(null, false, { message: "Usuario no autorizado" });
      }
      return done(null, profile);
    }
  )
);

const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.use(express.static("front"));

app.get("/admin", (req, res) => {
  res.sendFile(path.join(__dirname, "front", "admin.html"));
});

// Serialización de sesión
passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((obj, done) => {
  done(null, obj);
});

// Middlewares
app.use(cors({ credentials: true, origin: "*" }));
app.use(express.json());

// Rutas de la app
app.use("/survey", surveyRoutes);
app.use("/", adminRoutes);

// Inicializar DB y servidor
databaseInit((err) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port, () => {
      console.log(`✅ Database is listening and Node running on port ${port}`);
    });
  }
});
