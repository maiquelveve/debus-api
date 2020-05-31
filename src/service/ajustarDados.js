export const ajustarCpf = cpf => {
    return cpf.replace(/[^\d]+/g,'') 
}
