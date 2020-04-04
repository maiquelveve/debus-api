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
    },
    number: {
        moreThan: "${path} deve ser maior ${more}",
        lessThan: "${path} deve ser maior que ${less}",
        min: "${path} ser maior ${min} caracteres",
        max: "${path} deve ter no máximo ${max} caracteres",
        positive: '${path} deve ser um número posítivo',
        negative: '${path} deve ser um número negativo',
        integer: '${path} deve ser um número inteiro',
    }
}

export default validacaoDefinicao;