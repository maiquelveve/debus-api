import Veiculo from '../models/Veiculo';
import Sequelize from 'sequelize';
import dataBaseConfig from '../../config/database';

class VeiculosController {
    async listar(req, res) {
        try {
            const {id_usuario} = req.body;
            const {st_placa, id_empresa, ch_ativo } = req.query;

            const sequelize = new Sequelize(dataBaseConfig);
            const sql = `SELECT * 
                         FROM veiculos V 
                            INNER JOIN empresas E ON E.id = V.id_empresa 
                        WHERE E.id_usuario = ${id_usuario}`;
            const veiculos =  await sequelize.query(sql, { type: sequelize.QueryTypes.SELECT})                        
            res.status(200).json(veiculos)

        } catch (error) {
            const retorno = [{success: 0, msg: 'Ocorreu um erro. Tente novamente mais tarde!'}]                
            return res.status(400).json(retorno) 
        }
    }
}

export default new VeiculosController();