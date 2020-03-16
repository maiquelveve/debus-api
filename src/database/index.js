import Sequelize from 'sequelize';
import dataBaseConfig from '../config/database';

import Usuario from '../app/models/Usuario';
import Veiculo from '../app/models/Veiculo';
import Viagem from '../app/models/Viagem';

const models = [Usuario, Veiculo, Viagem];

class Database {
    constructor() {
        this.init();
    }

    init() {
        this.connection = new Sequelize(dataBaseConfig);
        models.map(model => model.init(this.connection))
    }
}

export default new Database();