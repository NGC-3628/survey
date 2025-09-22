const isAuthenticated = (req, res, next) => {
    // Si no hay sesión o usuario
    if (!req.session || !req.session.user) {
      return res.status(401).json({ message: "Acceso denegado. Inicia sesión." });
    }
  
    // Lista de usuarios permitidos (puedes meterla en .env)
    const allowedUsers = process.env.ALLOWED_USERS?.split(",") || [];
  
    // Verifica si el usuario de GitHub está autorizado
    if (!allowedUsers.includes(req.session.user.username)) {
      return res.status(403).json({ message: "No estás autorizado para acceder aquí." });
    }
  
    // Si todo bien, sigue
    next();
  };
  
  export { isAuthenticated };
  