import Empresa from '../models/Empresa';

class EmpresasController {
    
    async cadastrar(req, res) {
        try {
            const empresa = req.body

            const empresaExists = await Empresa.findOne({ where: {st_recefi: empresa.st_recefi}})
            if(empresaExists) {
                const retorno = [{success: 0, msg: 'Empresa já cadastrada no sistema.'}]                
                return res.status(400).json(retorno)  
            }

            await Empresa.create(empresa)
            
            const retorno = [{success: 1, msg: 'ok'}]                
            return res.status(200).json(retorno) 

        } catch (error) {
            const retorno = [{success: 0, msg: 'Ocorreu um erro. Verifique os dados informados!'}]                
            return res.status(400).json(retorno)  
        }
    }
}

export default new EmpresasController()