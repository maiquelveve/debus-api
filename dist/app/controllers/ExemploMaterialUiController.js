"use strict";Object.defineProperty(exports, "__esModule", {value: true});class ExemploMaterialUiController {

    async exemploMaterialUi(req, res){
        console.log(req.body)
        return res.status(200).json({ok:true})
    }
}

exports. default = new ExemploMaterialUiController();