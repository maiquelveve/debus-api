import Passageiro from '../models/Passageiro';
import ViagemPassageiro from '../models/ViagemPassageiro';
import Sequelize from 'sequelize';
import dataBaseConfig from '../../config/database';

class ViagensPassageirosController {

    async deletar(req, res) {
        const sequelize = new Sequelize(dataBaseConfig)
        const transaction = await sequelize.transaction()

        try {
            const { id_viagem } = req.query
            const { id_usuario } = req.body

            const sql = `SELECT VP.id, VP.id_passageiro
                         FROM viagens_passageiros VP
                            INNER JOIN viagens V ON V.id = VP.id_viagem
                            INNER JOIN passageiros P ON P.id = VP.id_passageiro
                            INNER JOIN usuarios U ON U.id = P.id_usuario
                         WHERE V.id = ${id_viagem} AND P.id_usuario = ${id_usuario}
                        `
            const registros = await sequelize.query(sql, { type: sequelize.QueryTypes.SELECT })
            
            let viagensPassageirosIds = [], passageirosIds = []
            registros.map( 
                registro => { 
                    viagensPassageirosIds = [...viagensPassageirosIds, registro.id]; 
                    passageirosIds = [...passageirosIds, registro.id_passageiro] 
                }
            )

            await ViagemPassageiro.destroy( { where: { id: viagensPassageirosIds } ,  transaction } )
            await Passageiro.destroy( { where: { id: passageirosIds },  transaction } )

            await transaction.commit();
            const retorno = [{success: 1, msg: 'ok'}]
            return res.status(200).json(retorno) 

        } catch (error) {
            await transaction.rollback();
            const retorno = [{success: 0, msg: 'Ocorreu um erro. Tente novamente mais tarde.'}]
            return res.status(500).json(retorno)
        }
    }
}

export default new ViagensPassageirosController();