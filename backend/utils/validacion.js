function vacios(array) {
    let count = 0
    const datos = Object.values(array)
    for (let i = 0; i < datos.length; i++) {
        const valor = datos[i] !== null && datos[i] !== undefined ? String(datos[i]) : "";
        if (valor.trim() !== "") {
            count++;
        }
    }
    return count;
}

function empty(array) {
    const datos = Object.values(array)
    for (let i = 0; i < datos.length; i++) {
        const valor = datos[i] !== null && datos[i] !== undefined ? String(datos[i]) : "";
        if (valor.trim() === "") {
            return false
        }
    }
    return true;
}

function object_vacios(array) {
    for (let i = 0; i < array.length; i++) {
        const obj = Object.values(array[i])
        for (let y = 0; y < obj.length; y++) {
            const valor = obj[y] !== null && obj[y] !== undefined ? String(obj[y]) : ""
            if (valor.trim() === "") {
                return false
            }
        }
    }
    return true
}
function object_incomplete(array, fields) {
    for (let i = 0; i < array.length; i++) {
        const obj = Object.values(array[i])
        if (obj.length != fields.length ) {
            return false
        }
    }
    return true
}


function incompletos(array, fields) {
    const data = []
    for (let i = 0; i < array.length; i++) {
        if (array[i] != null && array[i] != undefined) {
            data.push(array[i])
        }

    }
    if (data.length != fields.length) {
        return false;
    }
    return true;

}

module.exports = { vacios, empty, incompletos, object_vacios, object_incomplete }