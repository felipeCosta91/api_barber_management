import jwt from 'jsonwebtoken';
import User from '../models/users';
import Auth from '../../config/secret';

class SessionController {
  async storage(req, res) {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) { res.status(401).json({ error: 'user not found' }); }
    if (!await (user.checkPassword(password))) { return res.status(401).json({ error: 'password does not match' }); }
    const { id, name } = user;
    return res.json({
      user: {
        id,
        name,
        email,
      },
      token: jwt.sign({ id }, Auth.secret, { expiresIn: Auth.expiresIn }),
    });
  }
}

export default new SessionController();
