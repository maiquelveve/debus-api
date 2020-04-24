import Viagem from '../models/Viagem';
import Sequelize from 'sequelize';
import dataBaseConfig from '../../config/database';

import { validaString, validaNumber, validaData, validaHora } from '../../service/validacoesBasicas'

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

    async editar(req, res) {
        try {
            const { id } = req.params
            const erros = await validacao(req.body, res)

            if(erros === 0) {
                await Viagem.update(req.body, {where:{id}})
                const retorno = [{success: 1, msg: 'ok'}]
                return res.status(200).json(retorno)
            }
            
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
            const sql = `SELECT VI.id, VI.id_veiculo, VI.vagas, VI.vl_valor, VI.hh_horario, VI.dt_data, VI.nr_id_local_referencia_origem, VI.nr_id_local_referencia_destino, 
                                VE.id_empresa,
                                CD.id as cidade_destino_id, ED.id as estado_destino_id, PD.id as pais_destino_id,
                                CO.id as cidade_origem_id, EO.id as estado_origem_id, PO.id as pais_origem_id
                        FROM viagens VI 
                            INNER JOIN veiculos VE ON VE.id = VI.id_veiculo
                            INNER JOIN empresas E ON E.id = VE.id_empresa 
                            INNER JOIN locais_referencias LRO ON LRO.id = VI.nr_id_local_referencia_origem
                            INNER JOIN cidades CO ON CO.id = LRO.id_cidade
                            INNER JOIN estados EO ON EO.id = CO.id_Estado
                            INNER JOIN pais PO ON PO.id = EO.id_pais
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

async function validacao(dados, res) {
    try {
        let retorno = [{success: 0, msg: 'formError'}]

        if(0 === 0) {
            if(!validacoesBasicasForm(dados)) {
                retorno = [...retorno, {success: 0, msg: 'Ocorreu um erro. Verifique os dados informados.'}]
                res.status(400).json(retorno)
                return 1
            }

            if(!validaData(dados.dt_data)) {
                retorno = [...retorno, {success: 0, msg: 'Ocorreu um erro. Data Invalida.'}]
                res.status(400).json(retorno)
                return 1
            } 

            if(!validaHora(dados.hh_horario)) {
                retorno = [...retorno, {success: 0, msg: 'Ocorreu um erro. Hora Invalida.'}]
                res.status(400).json(retorno)
                return 1
            } 
            
            //Interlado entre datas, veiculos com menos lugares
            retorno = [...retorno, {success: 0, msg: 'Ocorreu um erro. Lugares disponiveis menor que o numero de vagas.'}]
            res.status(400).json(retorno)
            return 1
        }
        
        return 0

    } catch (error) {
        throw new Error('deu ruim')
    }
}

function validacoesBasicasForm(dados) {
    if(!validaNumber(dados.nr_id_local_referencia_origem, 1)) {
        return false
    }

    if(!validaNumber(dados.nr_id_local_referencia_destino, 1)) {
        return false
    }

    if(!validaNumber(dados.vl_valor, 0, 9999.99)) {
        return false
    }

    if(!validaNumber(dados.vagas, 1)) {
        return false
    }

    if(!validaNumber(dados.id_veiculo, 1)) {
        return false
    }

    if(!validaString(dados.dt_data, 10, 10)) {
        return false
    }

    if(!validaString(dados.hh_horario, 5, 5)) {
        return false
    }

    return true
}

export default new ViagensController();