import Sequelize from 'sequelize';
import dataBaseConfig from '../config/database';

import Usuario from '../app/models/Usuario';

const models = [Usuario];

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