import Sequelize from 'sequelize';
import Passageiro from '../models/Passageiro';
import ViagemPassageiro from '../models/ViagemPassageiro';
import dataBaseConfig from '../../config/database';

class PassageirosController {
    
    async cadastrar(req, res) {
        const sequelize = new Sequelize(dataBaseConfig);
        const transaction = await sequelize.transaction()

        try {
            const {id_viagem} = req.query
            const { st_nome, st_cpf, id_usuario } = req.body

            const novoPassageiro = await Passageiro.create({st_nome, st_cpf, id_usuario}, { transaction })
            await ViagemPassageiro.create( {id_viagem, id_passageiro: novoPassageiro.id}, { transaction } )

            transaction.commit();

            return res.status(200).json({success: 1, msg: 'ok'})
            
        } catch (error) {
            transaction.rollback();
            const retorno = [{success: 0, msg: 'Ocorreu um erro. Tente novamente mais tarde.'}]
            return res.status(500).json(retorno)
        }
    }

    async buscarPassageirosPorViagem(req, res) {
        try {
            const {id_viagem} = req.query
            const { id_usuario } = req.body
            
            const sql = `SELECT P.id, P.st_nome, P.st_cpf 
                         FROM passageiros P 
                            INNER JOIN viagens_passageiros VP ON P.id = VP.id_passageiro
                        WHERE VP.id_viagem = ${id_viagem} AND P.id_usuario = ${id_usuario}
                        `
            const sequelize = new Sequelize(dataBaseConfig);            
            const passageiros = await sequelize.query(sql, { type: sequelize.QueryTypes.SELECT})              

            return res.status(200).json(passageiros)
            
        } catch (error) {
            const retorno = [{success: 0, msg: 'Ocorreu um erro. Tente novamente mais tarde.'}]
            return res.status(500).json(retorno)
        }
    }
}

export default new PassageirosController();