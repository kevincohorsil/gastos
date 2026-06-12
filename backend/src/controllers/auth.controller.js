const jwt = require('jsonwebtoken');

class AuthController {
  async login(req, res) {
    try {
      const { username, password } = req.body;
      if (!username || !password) {
        return res.status(400).json({ success: false, message: 'Usuario y contraseña requeridos', data: null });
      }
      const validUser = username === process.env.ADMIN_USER;
      const validPass = password === process.env.ADMIN_PASSWORD;
      if (!validUser || !validPass) {
        return res.status(401).json({ success: false, message: 'Credenciales incorrectas', data: null });
      }
      const token = jwt.sign(
        { username, role: 'admin' },
        process.env.JWT_SECRET,
        { expiresIn: '8h' }
      );
      res.json({ success: true, message: 'Login exitoso', data: { token, username } });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Error del servidor', data: null });
    }
  }
}

module.exports = new AuthController();
