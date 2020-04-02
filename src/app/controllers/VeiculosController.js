import Veiculo from '../models/Veiculo';
import Sequelize from 'sequelize';
import dataBaseConfig from '../../config/database';

class VeiculosController {
    async listar(req, res) {
        try {
            const {id_usuario} = req.body;
            const {st_placa, id_empresa, ch_ativo } = req.query;

            let where = `WHERE E.ch_ativo = 'S' AND E.id_usuario = ${id_usuario}`;
            if(st_placa.trim() !== '') {
                where += ` AND V.st_placa = '${st_placa}'`
            }
            if(id_empresa.trim() !== '') {
                where += ` AND V.id_empresa = ${id_empresa}`
            }
            if(ch_ativo.trim() === 'S' || ch_ativo.trim() === 'N') {
                where += ` AND V.ch_ativo = '${ch_ativo}'`
            }

            const sequelize = new Sequelize(dataBaseConfig);
            const sql = `SELECT V.id, V.st_placa, V.nr_lugares, V.ch_ativo, E.st_nome 
                         FROM veiculos V 
                            INNER JOIN empresas E ON E.id = V.id_empresa 
                        ${where}`;
            const veiculos =  await sequelize.query(sql, { type: sequelize.QueryTypes.SELECT})                        
            res.status(200).json(veiculos)

        } catch (error) {
            const retorno = [{success: 0, msg: 'Ocorreu um erro. Tente novamente mais tarde!'}]                
            return res.status(400).json(retorno) 
        }
    }

    async ativar(req, res) {
        try {
            const { id_usuario } = req.body
            const { id } = req.params

            await Veiculo.update({ ch_ativo: 'S' }, {where: { id }})
            const retorno = [{success: 1, msg: 'ok'}]
            res.status(200).json(retorno)

        } catch (error) {
            const retorno = [{success: 0, msg: 'Ocorreu um erro. Tente novamente mais tarde!'}]
            res.status(400).json(retorno)
        }
    }

    async desativar(req, res) {
        try {
            const { id_usuario } = req.body
            const { id } = req.params
            
            await Veiculo.update({ ch_ativo: 'N' }, {where: { id }})
            const retorno = [{success: 1, msg: 'ok'}]
            res.status(200).json(retorno)

        } catch (error) {
            const retorno = [{success: 0, msg: 'Ocorreu um erro. Tente novamente mais tarde!'}]
            res.status(400).json(retorno)
        }
    }
}

export default new VeiculosController();