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

            await Empresa.create(empresa)
            
            const retorno = [{success: 1, msg: 'ok'}]                
            return res.status(200).json(retorno) 

        } catch (error) {
            const retorno = [{success: 0, msg: 'Ocorreu um erro. Tente novamente mais tarde!'}]                
            return res.status(400).json(retorno)  
        }
    }

    async listar(req, res) {
        try {
            const { id_usuario } = req.body
            const {st_nome, st_recefi} = req.query   
            
            let where = {id_usuario}
            if(st_nome.trim() !== '') {
                where.st_nome = st_nome
            }
            if(st_recefi.trim() !== '') {
                where.st_recefi = st_recefi
            }

            const retorno = await Empresa.findAll({ where, limit: 10 })            
            return res.status(200).json(retorno) 

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