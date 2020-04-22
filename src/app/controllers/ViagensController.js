import Viagem from '../models/Viagem';
import Sequelize from 'sequelize';
import dataBaseConfig from '../../config/database';

class ViagensController {
    async index(req, res) {
        const viagem = await Viagem.findAll({include:['veiculo', 'local_referencia_origem', 'local_referencia_destino']});
        res.json(viagem)
    }

    async cadastrar(req, res) {
        try {
            await Viagem.create(req.body)
            
            const retorno = [{success: 1, msg: 'ok'}]
            return res.status(200).json(retorno)

        } catch (error) {
            const retorno = [{success: 0, msg: 'Ocorreu um erro. Tente novamente mais tarde.'}]
            return res.status(500).json(retorno)
        }
    }

    async buscarViagem(req, res) {
        try {
            const id_usuario = req.body.id_usuario
            const { id } = req.params
            const sequelize = new Sequelize(dataBaseConfig);
            const sql = `SELECT VI.id_veiculo, VI.vagas, VI.id, VI.hh_horario, VI.dt_data, VI.nr_id_local_referencia_origem, VI.nr_id_local_referencia_destino, 
                                VE.id_empresa,
                                CD.id as cidade_destino_id, ED.id as estado_destino_id, PD.id as pais_destino_id
                                CD.id as cidade_destino_id, ED.id as estado_destino_id, PD.id as pais_destino_id

                        FROM viagens VI 
                            INNER JOIN veiculos VE ON VE.id = VI.id_veiculo
                            INNER JOIN empresas E ON E.id = VE.id_empresa 
                            INNER JOIN locais_referencias LRD ON LRD.id = VI.nr_id_local_referencia_destino
                            INNER JOIN cidades CD ON CD.id = LRD.id_cidade
                            INNER JOIN estados ED ON ED.id = CD.id_Estado
                            INNER JOIN pais PD ON PD.id = ED.id_pais
                            INNER JOIN locais_referencias LRD ON LRD.id = VI.nr_id_local_referencia_destino
                            INNER JOIN cidades CD ON CD.id = LRD.id_cidade
                            INNER JOIN estados ED ON ED.id = CD.id_Estado
                            INNER JOIN pais PD ON PD.id = ED.id_pais
                            
                         WHERE E.id_usuario = ${id_usuario} AND VI.id = ${id}`

            const viagem = await sequelize.query(sql, { type: sequelize.QueryTypes.SELECT}) 
            return res.status(200).json(viagem[0])  

        } catch (error) {
            const retorno = [{success: 0, msg: 'Ocorreu um erro. Tente novamente mais tarde.'}]
            return res.status(500).json(retorno)
        }
    }
}

export default new ViagensController();