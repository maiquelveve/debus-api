import Empresa from '../models/Empresa';
import * as yup from 'yup';
import validacaoDefinicao from '../../config/validacaoDefinicao';

class EmpresasController {
    
    async cadastrar(req, res) {
        try {
            const empresa = req.body

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