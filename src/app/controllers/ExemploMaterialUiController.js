class ExemploMaterialUiController {

    async exemploMaterialUi(req, res){
        console.log(req.body)
        return res.status(200).json({ok:true})
    }
}

export default new ExemploMaterialUiController();