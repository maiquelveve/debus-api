import Sequelize from 'sequelize';
import * as yup from 'yup';

import Veiculo from '../models/Veiculo';
import validacaoDefinicao from '../../config/validacaoDefinicao';
import dataBaseConfig from '../../config/database';

class VeiculosController {
    
    async cadastrar(req, res) {
        try {
            let veiculo = ajustarVeiculoParaBanco(req.body)
            
            const errors = await validaVeiculo(veiculo)
            if(errors[0].success === 0) {
                return res.status(400).json(errors)  
            }

            const veiculoExists = await verificaVeiculoExiste(veiculo)
            if(veiculoExists[0].success === 0) {
                return res.status(400).json(veiculoExists)  
            }
            
            await Veiculo.create(veiculo)
            const retorno = [{success: 1, msg: 'ok'}]
            return res.status(200).json(retorno)

        } catch (error) {
            const retorno = [{success: 0, msg: 'Ocorreu um erro. Tente novamente mais tarde!'}]
            return res.status(500).json(retorno)
        }
    }
    
    async listar(req, res) {
        try {
            const {id_usuario} = req.body;
            const { id_empresa, ch_ativo } = req.query;
            const st_placa = req.query.st_placa.normalize('NFD').replace(/[^a-zA-Z0-9s]/g, "").toUpperCase()

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
            console.log(error)
            const retorno = [{success: 0, msg: 'Ocorreu um erro. Tente novamente mais tarde!'}]                
            return res.status(500).json(retorno) 
        }
    }

    async ativar(req, res) {
        try {
            const { id } = req.params

            await Veiculo.update({ ch_ativo: 'S' }, {where: { id }})
            const retorno = [{success: 1, msg: 'ok'}]
            res.status(200).json(retorno)

        } catch (error) {
            const retorno = [{success: 0, msg: 'Ocorreu um erro. Tente novamente mais tarde!'}]
            res.status(500).json(retorno)
        }
    }

    async desativar(req, res) {
        try {
            const { id } = req.params
            
            await Veiculo.update({ ch_ativo: 'N' }, {where: { id }})
            const retorno = [{success: 1, msg: 'ok'}]
            res.status(200).json(retorno)

        } catch (error) {
            const retorno = [{success: 0, msg: 'Ocorreu um erro. Tente novamente mais tarde!'}]
            res.status(500).json(retorno)
        }
    }
}

function ajustarVeiculoParaBanco(veiculo) {
    veiculo.st_placa = veiculo.st_placa.normalize('NFD').replace(/[^a-zA-Z0-9s]/g, "").toUpperCase();
    veiculo.id_empresa = veiculo.id_empresa.replace(/[^0-9]+/g,'')
    veiculo.nr_lugares = veiculo.nr_lugares.replace(/[^0-9]+/g,'')
    return veiculo;
}

async function verificaVeiculoExiste(veiculo) {
    //Verifica se a empresa já existe no sistema.
    const veiculoExists = await Veiculo.findOne({ where: {st_placa: veiculo.st_placa, id_empresa: veiculo.id_empresa}})
    if(veiculoExists) {
        const retorno = [{success: 0, msg: 'Veiculo já cadastrado no sistema.'}]                
        return retorno
    }

    //Não houve nenhum erro
    const retorno = [{success: 1, msg: 'ok'}]                
    return retorno
}

async function validaVeiculo(veiculo) {
    //Validaçõe dos Campos Inicio
    yup.setLocale(validacaoDefinicao)
    const schemaValidate = yup.object().shape({
        st_placa: yup
            .string()
            .min(7)
            .max(7)
            .required(),
            
        id_empresa: yup
            .number()
            .moreThan(0)
            .required(),
            
        nr_lugares: yup    
            .number()
            .moreThan(0)
            .required()
    })
    
    const erros = await schemaValidate.validate(veiculo, { abortEarly: false }).then( () => false ).catch( erros => {return true})
    
    if(erros === true) {
        const retorno = [{success: 0, msg: 'Ocorreu um erro. Verifique os dados informados!'}]
        return retorno
    }                            
    //Validaçõe dos Campos FINAL
    
    //Não houve nenhum erro
    const retorno = [{success: 1, msg: 'ok'}]                
    return retorno
}

export default new VeiculosController();