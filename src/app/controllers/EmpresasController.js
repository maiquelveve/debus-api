import Empresa from '../models/Empresa';

class EmpresasController {
    async cadastrar(req, res) {
        
        const empresas = await Empresa.findAll({include: ['usuario']})
        res.json(empresas)
    }
}

export default new EmpresasController()