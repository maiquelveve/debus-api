const validacaoDefinicao = 
{
    mixed: {
        default: '${path} Não é válido',
        required: "${path} é um campo obrigatório"
    },
    string: {
        min: "${path} deve ter no mínimo ${min} caracteres",
        max: "${path} deve ter no máximo ${max} caracteres",
        email: "${path} é invalido."
    }
}

export default validacaoDefinicao;