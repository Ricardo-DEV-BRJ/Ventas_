const emailReg = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i


function empty(data) {
    const obj = Object.values(data)
    for (let i = 0; i < obj.length; i++) {
        if (obj[i] === null) {
            console.log('null')
            return { result: false, msj: 'No se deben enviar datos vacíos' }
        }
        if (obj[i].trim() === '') {
            console.log('vacio')
            return { result: false, msj: 'No se deben enviar datos vacíos' }
        }
    }
    return { result: true };
}

function tel(cod, tel) {
    if (cod === null && tel.trim() === '') {
        return {
            result: true, telefono: 'Sin contacto', msj: ''
        }
    } else if (cod === null && tel.trim() != '') {
        return {
            result: false, telefono: '', msj: 'Falta el codigo de teléfono'
        }
    } else if (cod != null && tel.trim() === '') {
        return {
            result: false, telefono: '', msj: 'Falta el número de teléfono'
        }
    } else {
        const telefonoFormateado = String(cod) + String(tel);
        const valido = parseFloat(telefonoFormateado) && /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im.test(telefonoFormateado);
        return {
            result: valido, telefono: String(cod) + '-' + String(tel), msj: valido ? '' : 'Número de teléfono inválido'
        }
    }
}

function mail(mail, type) {
    if (type === null && mail.trim() === '') {
        return {
            result: true, mail: 'Sin correo', msj: ''
        }
    } else if (type === null && mail.trim() != '') {
        return {
            result: false, mail: '', msj: 'Ingrese un correo válido'
        }
    } else if (type != null && mail.trim() === '') {
        return {
            result: false, mail: '', msj: 'Ingrese un correo válido'
        }
    } else {
        const email = String(mail) + String(type)
        const valido = emailReg.test(email)
        return {
            result: valido,
            mail: email,
            msj: valido ? '' : 'Email inválido debe ser example@mail.com'
        }
    }
}


function modify_data(data, backup) {
    let result = {}
    const datos = Object.keys(data)
    datos.forEach((key) => {
        if (data[key] !== backup[key]) {
            result[key] = data[key]
        }
    });

    if (Object.keys(result).length === 0) {
        return { result: false, msj: 'Datos sin modificar' }
    }
    return { result: true, data: result }
}


export {
    empty,
    tel,
    mail,
    modify_data
}