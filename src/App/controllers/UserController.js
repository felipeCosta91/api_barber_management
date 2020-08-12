import * as Yup from 'yup';
import Users from '../models/users';

class UserController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().email().required(),
      password: Yup.string().required().min(6),
    });
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }
    const userExists = await Users.findOne({ where: { email: req.body.email } });
    if (userExists) {
      return res.status(400).json({ error: 'user arredy exists' });
    }
    const {
      id, name, email, provider,
    } = await Users.create(req.body);

    return res.json({
      id, name, email, provider,
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
      oldPassword: Yup.string().min(6),
      password: Yup.string()
        .min(6)
        .when('oldPassword', (oldPassword, field) => (oldPassword ? field.required() : field)),
      confirmPassword: Yup.string().when('password', (password, field) => (password ? field.required().oneOf([Yup.ref('password')]) : field)),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }
    const { email, oldPassword } = req.body;
    const user = await Users.findByPk(req.idUser);
    if (email && email !== user.email) {
      const userExists = await Users.findOne({ where: { email } });
      if (userExists) {
        return res.status(401).json({ err: 'email já existe' });
      }
    }
    if (oldPassword && !(await user.checkPassword(oldPassword))) {
      return res.status(401).json({ error: 'password does not match ' });
    }
    const { id, name, provider } = await user.update(req.body);

    return res.json({
      id, name, email, provider,
    });
  }
}

export default new UserController();
