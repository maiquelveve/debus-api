import LocalReferencia from '../models/LocalReferencia';
import Sequelize from 'sequelize';
import dataBaseConfig from '../../config/database';
import { validaString, validaNumber } from '../../service/validacoesBasicas';

class LocaisReferenciasController {

    async cadastrar(req, res) {
        try {
            const erros = await validacao(req.body, res);

            if(erros === 0) {
                await LocalReferencia.create(req.body)
                const retorno = [{success: 1, msg: 'ok'}]
                return res.status(200).json(retorno)
            }

        } catch (error) {
            const retorno = [{success: 0, msg: 'Ocorreu um eroo. Tente novamente mais tarde.'}]
            return res.status(500).json(retorno)
        }
    }

    async editar(req, res) {
        try {
            const erros = await validacao(req.body, res);
            const { id } = req.params
            const { id_usuario } = req.body

            if(erros === 0) {
                await LocalReferencia.update(req.body, {where:{id, id_usuario, ch_ativo: 'S'}})
                const retorno = [{success: 1, msg: 'ok'}]
                return res.status(200).json(retorno)
            }

        } catch (error) {
            const retorno = [{success: 0, msg: 'Ocorreu um eroo. Tente novamente mais tarde.'}]
            return res.status(500).json(retorno)
        }
    }

    async listar(req, res) {
        try {
            const { id_pais, id_estado, id_cidade, st_dsc } = req.query
            const { id_usuario } = req.body

            let where = `WHERE LR.ch_ativo = 'S' AND LR.id_usuario = ${id_usuario}`

            if(id_pais > 0) {
                where += ` AND E.id_pais = ${id_pais}`
            }

            if(id_estado > 0) {
                where += ` AND C.id_Estado = ${id_estado}`
            }

            if(id_cidade > 0) {
                where += ` AND LR.id_cidade = ${id_cidade}`
            }

            if(st_dsc !== '') {
                where += ` AND LR.st_dsc LIKE '%${st_dsc}%'`
            }

            const sequelize = new Sequelize(dataBaseConfig);
            const sql = `SELECT LR.id, LR.st_dsc, C.st_nome, E.ch_sigla as ch_sigla_estado, P.st_nome as st_pais
                         FROM locais_referencias LR
                            INNER JOIN cidades C ON C.id = LR.id_cidade
                            INNER JOIN estados E ON E.id = C.id_Estado
                            INNER JOIN pais P ON P.id = E.id_pais
                        ${where}
                        `
            const retorno = await sequelize.query(sql, { type: sequelize.QueryTypes.SELECT })
            return res.status(200).json(retorno)

        } catch (error) {
            const retorno = [{success: 0, msg: 'Ocorreu um erro. Tente novamente mais tarde.'}]
            return res.status(500).json(retorno)
        }
    }

    async cancelar(req, res) {
        try {
            const { id } = req.params
            const {id_usuario } = req.body

            await LocalReferencia.update({ ch_ativo: 'N' }, { where:{id, id_usuario} })
            return res.status(200).json({ok:true})

        } catch (error) {
            const retorno = [{success: 0, msg: 'Ocorreu um erro. Tente novamente mais tarde.'}]
            return res.status(500).json(retorno)
        }
    }

    async buscarLocaisReferencias(req, res) {
        try {
            const { id } = req.params
            const { id_usuario } = req.body

            const sequelize = new Sequelize(dataBaseConfig);
            const sql = `SELECT LR.id, LR.st_dsc, LR.id_cidade, C.id_estado, E.id_pais 
                         FROM locais_referencias LR
                            INNER JOIN cidades C ON C.id = LR.id_cidade
                            INNER JOIN estados E ON E.id = C.id_Estado
                            INNER JOIN pais P ON P.id = E.id_pais
                        WHERE LR.id = ${id} AND LR.id_usuario = ${id_usuario} AND LR.ch_ativo = 'S'
                        `
            const retorno = await sequelize.query(sql, { type: sequelize.QueryTypes.SELECT })
            return res.status(200).json(retorno)

        } catch (error) {
            const retorno = [{success: 0, msg: 'Ocorreu um erro. Tente novamente mais tarde.'}]
            return res.status(500).json(retorno)
        }
    }

    async buscarLocaisReferenciasPorCidades(req, res) {
        try {
            const {id_cidade} = req.query
            const {id_usuario} = req.body
            const locaisReferencias = await LocalReferencia.findAll({where:{id_cidade, id_usuario, ch_ativo: 'S' }})

            return res.status(200).json(locaisReferencias)

        } catch (error) {
            const retorno = [{success: 0, msg: 'Ocorreu um eroo. Tente novamente mais tarde.'}]
            return res.status(500).json(retorno)
        }
    }
}

function validacao(dados, res) {

    let retorno = [{success: 0, msg: 'formError'}]

    if(!validaString(dados.st_dsc, 2, 128)) {
        retorno = [...retorno, {success: 0, msg: 'Ocorreu um erro. Verifique os dados informados.'}]
        res.status(400).json(retorno)
        return 1 
    }

    if(!validaNumber(dados.id_cidade, 1)) {
        retorno = [...retorno, {success: 0, msg: 'Ocorreu um erro. Verifique os dados informados.'}]
        res.status(400).json(retorno)      
        return 1
    }

    return 0
}

export default new LocaisReferenciasController();