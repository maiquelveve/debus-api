export const validaString = (string, min = 1, max = Infinity) => {
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
}

export const validaNumber = (number, min = 0, max = Infinity ) => {

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
}