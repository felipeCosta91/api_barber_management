import Sequelize from 'sequelize';
// arquivo responsável por criar a conexão entre o model e o banco de dados
// importa as configurações do banco de dados
import databaseConfig from '../config/database';
// importar os models que desejo fazer a conexão
import User from '../App/models/users';

const models = [User];
class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig); // aqui dentro já esta a
    // conexão com banco de dados
    // passando a conexão para todos os models
    models.map((model) => model.init(this.connection));
  }
}

export default new Database();
