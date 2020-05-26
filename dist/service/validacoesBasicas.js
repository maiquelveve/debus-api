"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _datefns = require('date-fns');

 const validaString = (string, min = 1, max = Infinity) => {
    string = string.trim()

    if(string === '') {
        return false
    }

    if(string.length < min) {
        return false
    }

    if(string.length > max) {
        return false
    }

    return true
}; exports.validaString = validaString

 const validaNumber = (number, min = 0, max = Infinity ) => {

    if(typeof number !== 'number') {
        return false
    }

    if(isNaN(number)) {
        return false
    }
    
    if(number < min) {
        return false
    }

    if(number > max) {
        return false
    }

    return true
}; exports.validaNumber = validaNumber

 const validaData = data => {
    try {
        data = data.split('-')
        
        //Caso o usuario não preencha a data no formato certo com pelo menos as 
        if(data.length < 3 || data[0].length !== 4) {
            throw new Error('INCOMPLETA')
        }

        //Se for uma data invalida 30/02/2020 vai cair no catch
        const newDate = _datefns.parseISO.call(void 0, `${data[0]}-${data[1]}-${data[2]}`)
        _datefns.format.call(void 0, newDate, "yyyy-MM-dd");
        return true

    } catch (error) {
        return false
    }
}; exports.validaData = validaData

 const validaHora = hora => {
    
    if(hora.substring(0,1) < 0 || hora.substring(1,2) < 0 || hora.substring(3,4) < 0 || hora.substring(4,5) < 0) {
        return false
    }

    /* VALIDAÇÂO DAS HORAS */
    //Valida 1 digito da HORA
    if(hora.substring(0,1) > 2) {
        return false
    }

    //Valida 2 digito da HORA
    if(parseInt(hora.substring(0,1)) === 2 && hora.substring(1,2) > 3) {
        return false
    }

    /* VALIDAÇÂO DAS MINITOS */
    //Valida 1 digito da MINUTOS
    if(hora.substring(3,4) > 5) {
        return false
    }

    return true
}; exports.validaHora = validaHora