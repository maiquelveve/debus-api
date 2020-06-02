import Sequelize from 'sequelize';
import Passageiro from '../models/Passageiro';
import ViagemPassageiro from '../models/ViagemPassageiro';
import dataBaseConfig from '../../config/database';

import * as yup from 'yup';
import validacaoDefinicao from '../../config/validacaoDefinicao';

import { ajustarCpf } from '../../service/ajustarDados'

class PassageirosController {

    async cadastrar(req, res) {
        const sequelize = new Sequelize(dataBaseConfig);
        const transaction = await sequelize.transaction()

        try {
            const {id_viagem} = req.query
            const passageiro = ajustaPassageiroParaBanco(req.body)

            const errors = await validaPassageiro(passageiro)
            if(errors[0].success === 0) {
                return res.status(400).json(errors)  
            }

            const novoPassageiro = await Passageiro.create(passageiro, { transaction } )
            await ViagemPassageiro.create( {id_viagem, id_passageiro: novoPassageiro.id}, { transaction } )

            await transaction.commit();
            return res.status(200).json({success: 1, msg: 'ok'})
            
        } catch (error) {
            await transaction.rollback();
            const retorno = [{success: 0, msg: 'Ocorreu um erro. Tente novamente mais tarde.'}]
            return res.status(500).json(retorno)
        }
    }

    async editar(req, res) {
        try {
            const { id } = req.params
            const passageiro = ajustaPassageiroParaBanco(req.body)

            const errors = await validaPassageiro(passageiro)
            if(errors[0].success === 0) {
                return res.status(400).json(errors)  
            }

            await Passageiro.update(passageiro, { where: { id } })
            return res.status(200).json({success: 1, msg: 'ok'})

        } catch (error) {
            const retorno = [{success: 0, msg: 'Ocorreu um erro. Tente novamente mais tarde.'}]
            return res.status(500).json(retorno)
        }
    }

    async delete(req, res) {
        const sequelize = new Sequelize(dataBaseConfig);
        const transaction = await sequelize.transaction()

        try {
            const { id_usuario } = req.body
            const { id } = req.params 

            await ViagemPassageiro.destroy({where: { id_passageiro: id }, transaction })
            await Passageiro.destroy({where: { id, id_usuario },  transaction })

            await transaction.commit();
            return res.status(200).json({success: 1, msg: 'Ok'})
            
        } catch (error) {
            await transaction.rollback();
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

async function validaPassageiro(passageiro) {
    //Validaçõe dos Campos Inicio
    yup.setLocale(validacaoDefinicao)
    const schemaValidate = yup.object().shape({
        st_nome: yup
            .string()
            .min(2)
            .max(100)
            .required(),

        st_cpf: yup
            .string()
            .min(11)
            .max(11)
            .required(),
            
        id_usuario: yup
            .number()
            .moreThan(0)
            .required(),
    })
    
    const erros = await schemaValidate.validate(passageiro, { abortEarly: false }).then( () => false ).catch( erros => {return true})
    
    if(erros === true) {
        const retorno = [{success: 0, msg: 'Ocorreu um erro. Verifique os dados informados!'}]
        return retorno
    }                            
    //Validaçõe dos Campos FINAL
    
    //Não houve nenhum erro
    const retorno = [{success: 1, msg: 'ok'}]                
    return retorno
}

function ajustaPassageiroParaBanco(passageiro) {
    const st_nome = passageiro.st_nome
    const st_cpf = ajustarCpf(passageiro.st_cpf)
    const id_usuario = passageiro.id_usuario
    
    const newPassageiro = { st_nome, st_cpf, id_usuario }
    return newPassageiro
}

export default new PassageirosController();