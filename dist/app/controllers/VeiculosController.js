"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { newObj[key] = obj[key]; } } } newObj.default = obj; return newObj; } } function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize);

var _yup = require('yup'); var yup = _interopRequireWildcard(_yup);

var _Veiculo = require('../models/Veiculo'); var _Veiculo2 = _interopRequireDefault(_Veiculo);
var _validacaoDefinicao = require('../../config/validacaoDefinicao'); var _validacaoDefinicao2 = _interopRequireDefault(_validacaoDefinicao);
var _database = require('../../config/database'); var _database2 = _interopRequireDefault(_database);

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
            
            await _Veiculo2.default.create(veiculo)
            const retorno = [{success: 1, msg: 'ok'}]
            return res.status(200).json(retorno)

        } catch (error) {
            const retorno = [{success: 0, msg: 'Ocorreu um erro. Tente novamente mais tarde!'}]
            return res.status(500).json(retorno)
        }
    }

    async editar(req, res) {
        try {
            let veiculo = ajustarVeiculoParaBanco(req.body)
            const id = parseInt(req.params.id)

            const errors = await validaVeiculo(veiculo)
            if(errors[0].success === 0) {
                return res.status(400).json(errors)  
            }

            //Buscar para ver se o veiculo eh do usuario mesmo se não for ou se não existir retorna erro
            const veiculoAtual = await _Veiculo2.default.findOne({where:{id}})
            if(!veiculoAtual) {
                const retorno = [{success: 0, msg: 'Veiculo não existe no sistema.'}]                
                return res.status(500).json(retorno)
            }

            //Se houve mudaça na empresa ou na placa tem que ser validado se já exixste no sistema
            if(veiculoAtual.st_placa !== veiculo.st_placa || parseInt(veiculoAtual.id_empresa) !== parseInt(veiculo.id_empresa)) {
                const veiculoExists = await verificaVeiculoExiste(veiculo)
                if(veiculoExists[0].success === 0) {
                    return res.status(400).json(veiculoExists)  
                }
            }
            
            await _Veiculo2.default.update(veiculo, {where:{id}})

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

            const sequelize = new (0, _sequelize2.default)(_database2.default);
            const sql = `SELECT V.id, V.st_placa, V.nr_lugares, V.ch_ativo, E.st_nome 
                         FROM veiculos V 
                            INNER JOIN empresas E ON E.id = V.id_empresa 
                        ${where}
                        ORDER BY ch_ativo DESC, id ASC
                        LIMIT 10`;
            const veiculos = await sequelize.query(sql, { type: sequelize.QueryTypes.SELECT})                        
            res.status(200).json(veiculos)

        } catch (error) {
            const retorno = [{success: 0, msg: 'Ocorreu um erro. Tente novamente mais tarde!'}]                
            return res.status(500).json(retorno) 
        }
    }

    async buscarVeiculo(req, res) {
        try {
            const id_usuario = req.body.id_usuario
            const { id } = req.params
            
            const sequelize = new (0, _sequelize2.default)(_database2.default);
            const sql = `SELECT V.id, V.st_placa, V.nr_lugares, V.id_empresa 
                         FROM veiculos V 
                            INNER JOIN empresas E ON E.id = V.id_empresa 
                         WHERE E.id_usuario = ${id_usuario} AND V.ch_ativo = 'S' AND V.id = ${id}`
            const veiculo = await sequelize.query(sql, { type: sequelize.QueryTypes.SELECT}) 
            return res.status(200).json(veiculo[0])      

        } catch (error) {
            const retorno = [{success: 0, msg: 'Ocorreu um erro ao buscar o veículo. Tente novamente mais tarde!'}]                
            return res.status(500).json(retorno)
        }
    }

    async buscarVeiculosPorEmpresa(req, res) {
        try {
            const {id_empresa} = req.query
            const veiculos = await _Veiculo2.default.findAll({where:{id_empresa, ch_ativo: {[_sequelize.Op.eq]: 'S'} }})
            return res.status(200).json(veiculos)

        } catch (error) {
            const retorno = [{success: 0, msg: 'Ocorreu um erro ao buscar o veículo. Tente novamente mais tarde!'}]                
            return res.status(500).json(retorno)
        }
    }

    async ativar(req, res) {
        try {
            const { id } = req.params

            await _Veiculo2.default.update({ ch_ativo: 'S' }, {where: { id }})
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
            
            await _Veiculo2.default.update({ ch_ativo: 'N' }, {where: { id }})
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
    const veiculoExists = await _Veiculo2.default.findOne({ where: {st_placa: veiculo.st_placa, id_empresa: veiculo.id_empresa}})
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
    yup.setLocale(_validacaoDefinicao2.default)
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

exports. default = new VeiculosController();