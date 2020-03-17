import Sequelize from 'sequelize';
import dataBaseConfig from '../config/database';

import Usuario from '../app/models/Usuario';
import Veiculo from '../app/models/Veiculo';
import Viagem from '../app/models/Viagem';
import Empresa from '../app/models/Empresa';
import Pais from '../app/models/Pais';
import Estado from '../app/models/Estado';
import Cidade from '../app/models/Cidade';
import LocalReferncia from '../app/models/LocalReferencia';
import Passageiro from '../app/models/Passageiro';
import ViagemPassageiro from '../app/models/ViagemPassageiro';

const models = [Usuario, Veiculo, Viagem, Empresa, Pais, Estado, Cidade, LocalReferncia, Passageiro, ViagemPassageiro];

class Database {
    constructor() {
        this.init();
    }

    init() {
        this.connection = new Sequelize(dataBaseConfig);
        models.map(model => model.init(this.connection))
              .map( model => model.associate && model.associate(this.connection.models))
    }
}

export default new Database();