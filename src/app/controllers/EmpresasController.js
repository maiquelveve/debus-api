import { Op } from 'sequelize';
import Empresa from '../models/Empresa';
import * as yup from 'yup';
import validacaoDefinicao from '../../config/validacaoDefinicao';

class EmpresasController {
    
    async cadastrar(req, res) {
        try {
            const empresa = ajustarEmpresaParaBanco(req.body)
            
            const errors = await validaEmpresa(empresa)
            if(errors[0].success === 0) {
                return res.status(400).json(errors)  
            }

            const empresaExists = await verificaEmpresaExiste(empresa)
            if(empresaExists[0].success === 0) {
                return res.status(400).json(empresaExists)  
            }

            await Empresa.create(empresa)
            
            const retorno = [{success: 1, msg: 'ok'}]                
            return res.status(200).json(retorno) 

        } catch (error) {
            const retorno = [{success: 0, msg: 'Ocorreu um erro. Tente novamente mais tarde!'}]                
            return res.status(400).json(retorno)  
        }
    }

    async editar(req, res) {
        try {
            let empresaDados = ajustarEmpresaParaBanco(req.body)
            empresaDados.id = parseInt(req.params.id)
            
            const errors = await validaEmpresa(empresaDados)
            if(errors[0].success === 0) {
                return res.status(400).json(errors)  
            }

            const empresa = await Empresa.findOne({where: { id: empresaDados.id}});
            if(!empresa) {
                const retorno = [{success: 0, msg: 'Empresa não existe no sistema.'}]                
                return retorno
            }

            //Aqui eh verifica se mudou o st_recefi se sim verificar se empresa ja existe
            if(parseInt(empresa.st_recefi) !== parseInt(empresaDados.st_recefi)) {
                const empresaExists = await verificaEmpresaExiste(empresaDados)
                if(empresaExists[0].success === 0) {
                    return res.status(400).json(empresaExists)  
                }
            }

            await empresa.update(empresaDados)
            const retorno = [{success: 1, msg: 'ok'}]                
            return res.status(200).json(retorno)

        } catch (error) {
            const retorno = [{success: 0, msg: 'Ocorreu um erro. Tente novamente mais tarde!'}]                
            return res.status(400).json(retorno)  
        }
    }

    async ativar(req, res) {
        try {
            const { id_usuario } = req.body
            const { id } = req.params

            await Empresa.update({ ch_ativo: 'S' }, {where: { id, id_usuario}})
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

            await Empresa.update({ ch_ativo: 'N' }, {where: { id, id_usuario}})
            const retorno = [{success: 1, msg: 'ok'}]
            res.status(200).json(retorno)

        } catch (error) {
            const retorno = [{success: 0, msg: 'Ocorreu um erro. Tente novamente mais tarde!'}]
            res.status(400).json(retorno)
        }
    }

    async listar(req, res) {
        try {
            const { id_usuario } = req.body
            const {st_nome, st_recefi, ch_ativo} = req.query   
            console.log(req.query)

            let where = {id_usuario}
            if(st_nome.trim() !== '') {
                where.st_nome = {[Op.substring]: [st_nome]}
            }
            if(st_recefi.trim() !== '') {
                where.st_recefi = st_recefi
            }
            if(ch_ativo.trim() === 'S' || ch_ativo.trim() === 'N') {
                where.ch_ativo = ch_ativo
            }
            
            const retorno = await Empresa.findAll({ where, limit: 10, order: [['ch_ativo', 'DESC'], ['id', 'ASC']] }) //st_nome: {[Op.substring]: [st_nome]} eh o operado igual a CAMPO LIKE '%text%'           

            return res.status(200).json(retorno)   

        } catch (error) {
            console.log(error)
            const retorno = [{success: 0, msg: 'Ocorreu um erro. Tente novamente mais tarde!'}]                
            return res.status(400).json(retorno)  
        }
    }

    async buscarEmpresa(req, res) {
        try {
            const id_usuario = req.body.id_usuario
            const id = req.params.id
            const empresa = await Empresa.findOne({ where: { id, id_usuario } })
            return res.status(200).json(empresa);

        } catch (error) {
            const retorno = [{success: 0, msg: 'Ocorreu um erro. Tente novamente mais tarde!'}]                
            return res.status(400).json(retorno)  
        }
    }

    async buscarEmpresasUsuario(req, res) {
        try {
            const {id_usuario} = req.body;
            const empresas = await Empresa.findAll({ where: {id_usuario}})
            res.status(200).json(empresas)

        } catch (error) {
            const retorno = [{success: 0, msg: 'Ocorreu um erro. Tente novamente mais tarde!'}]                
            return res.status(400).json(retorno)  
        }
    }
}

function ajustarEmpresaParaBanco(empresa) {
    empresa.st_nome = empresa.st_nome.toUpperCase();
    empresa.st_cel = empresa.st_cel.replace(/[^0-9]+/g,'')
    empresa.st_recefi = empresa.st_recefi.replace(/[^0-9]+/g,'')
    return empresa;
}

async function validaEmpresa(empresa) {
    //Validaçõe dos Campos Inicio
    yup.setLocale(validacaoDefinicao)
    const schemaValidate = yup.object().shape({
        st_nome: yup
            .string()
            .max(50)
            .required(),
            
        st_recefi: yup
            .string()
            .max(50)
            .required(),
            
        st_cel: yup    
            .string()
            .max(50)
            .required()
    })

    const erros = await schemaValidate.validate(empresa, { abortEarly: false }).then( () => false ).catch( () => true)
    
    if(erros === true) {
        const retorno = [{success: 0, msg: 'Ocorreu um erro. Verifique os dados informados!'}]
        return retorno
    }                            
    //Validaçõe dos Campos FINAL
    
    //Não houve nenhum erro
    const retorno = [{success: 1, msg: 'ok'}]                
    return retorno
}

async function verificaEmpresaExiste(empresa) {
    //Verifica se a empresa já existe no sistema.
    const empresaExists = await Empresa.findOne({ where: {st_recefi: empresa.st_recefi}})
    if(empresaExists) {
        const retorno = [{success: 0, msg: 'Empresa já cadastrada no sistema.'}]                
        return retorno
    }

    //Não houve nenhum erro
    const retorno = [{success: 1, msg: 'ok'}]                
    return retorno
}

export default new EmpresasController()