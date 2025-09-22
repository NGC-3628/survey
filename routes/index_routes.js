import express from "express";
import passport from "passport";

const router = express.Router();

// Página de inicio del admin (si quieres mostrar estado de sesión)
router.get("/admin", (req, res) => {
  if (req.session.user) {
    res.send(`Bienvenido ${req.session.user.displayName} (${req.session.user.username})`);
  } else {
    res.send("No has iniciado sesión. Ve a /admin/login");
  }
});

// LOGIN con GitHub
router.get("/admin/login", passport.authenticate("github"));

// CALLBACK de GitHub → crea sesión y redirige
router.get(
  "/github/callback",
  passport.authenticate("github", { failureRedirect: "/admin/denied" }),
  (req, res) => {
    // Guardar datos básicos del usuario en la sesión
    req.session.user = {
      id: req.user.id,
      username: req.user.username,
      displayName: req.user.displayName
    };
    res.redirect("/admin"); // redirige al panel
  }
);

// LOGOUT
router.get("/admin/logout", (req, res, next) => {
  req.logout(function (err) {
    if (err) return next(err);
    req.session.destroy(() => {
      res.redirect("/");
    });
  });
});

// Página de acceso denegado
router.get("/admin/denied", (req, res) => {
  res.send("<h1>Acceso denegado</h1><p>No estás autorizado para entrar aquí.</p>");
});

export default router;
