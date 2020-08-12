import Sequelize, { Model } from 'sequelize';
import bcrypt from 'bcryptjs';

class User extends Model {
  static init(sequelize) {
    super.init({ // super.init chamando o metodo init da classe model
      name: Sequelize.STRING,
      email: Sequelize.STRING,
      password: Sequelize.VIRTUAL, // campo virtual só existe no model não existe no bando
      password_hash: Sequelize.STRING,
      provider: Sequelize.BOOLEAN,
    },
    {
      sequelize, // o sequelize tem que ser passado como segundo parametro

    });
    // ação que executa antes de salvar no banco de dados
    this.addHook('beforeSave', async (user) => {
      if (user.password) {
        user.password_hash = await bcrypt.hash(user.password, 8);
      }
    });
    return this;
  }

  // verifica se a senha enviada é a mesma salva no banco
  checkPassword(password) {
    return bcrypt.compare(password, this.password_hash);
  }
}
export default User;
