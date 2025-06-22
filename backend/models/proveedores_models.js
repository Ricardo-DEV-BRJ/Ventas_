const connection = require('../connection')
const { v4: uuidv4 } = require('uuid');
const { todos, crear, uno, modificar, eliminar } = require('../utils/consultas')
const { vacios, incompletos } = require('../utils/validacion')

class ProveedoresModels {
    todos() {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM proveedores WHERE hab_prov = ?'
            connection.query(query, [true], function (error, result, field) {
                if (error) {
                    return reject({ msj_error: 'Error del servidor', error: error })
                }
                if (result.length > 0) {
                    result.map((item) => {
                        if (item.hab_prov == 1) {
                            item.hab_prov = true
                        } else {
                            item.hab_prov = false
                        }
                        if (item.vig_prov == 1) {
                            item.vig_prov = true
                        } else {
                            item.vig_prov = false
                        }
                    })
                }
                resolve(result)
            })
        })
    }

    uno(proveedor) {
        return new Promise((resolve, reject) => {
            const params = [proveedor.id_prov]
            const query = uno('proveedores', 'id_prov')
            connection.query(query, params, function (error, result, field) {
                if (error) {
                    return reject({ msj_error: 'Error del servidor', error: error })
                }
                if (result.length === 0) {
                    return reject({ msj_error: 'Proveedor no encontrado' })
                }
                resolve(result)
            })
        })

    }

    crear(proveedor) {
        return new Promise((resolve, reject) => {
            const vacio = vacios(proveedor)
            const data = Object.values(proveedor)
            if (data.length != vacio) {
                return reject({ msj_error: 'No se deben enviar datos vacíos' })
            }
            const id_prov = uuidv4()
            const fec_prov = new Date()
            const hab_prov = true
            const params = [id_prov, proveedor.nom_prov, proveedor.iden_prov, fec_prov, true, hab_prov]
            const fields = ['id_prov', 'nom_prov', 'iden_prov', 'fec_prov', 'vig_prov', 'hab_prov']
            const query = crear('proveedores', fields)
            const all_data = incompletos(params, fields)
            if (!all_data) {
                return reject({ msj_error: 'Datos incompletos' })
            }
            connection.query(query, params, function (error, result, field) {
                if (error) {
                    if (error.sqlMessage.includes('Duplicate')) {
                        if (error.sqlMessage.includes('nom_prov')) {
                            return reject({ msj_error: 'Nombre de proveedor ya registrada' })
                        }
                        if (error.sqlMessage.includes('iden_prov')) {
                            return reject({ msj_error: 'Identificación ya registrada' })
                        }

                    }
                    return reject({ msj_error: 'Error del servidor', error: error })
                }
                resolve({ msj: 'Registrado con éxito' })
            })
        })

    }

    modificar(proveedor) {
        return new Promise((resolve, reject) => {
            const vacio = vacios(proveedor)
            const data = Object.values(proveedor)
            if (data.length != vacio) {
                return reject({ msj_error: 'No se deben enviar datos vacios' })
            }
            let update = []
            let params = []

            if (!proveedor.id_prov) {
                return reject({ msj_error: 'ID requerido' })
            }
            if (proveedor.nom_prov) {
                update.push('nom_prov')
                params.push(proveedor.nom_prov)
            }
            if (proveedor.iden_prov) {
                update.push('iden_prov')
                params.push(proveedor.iden_prov)
            }
            if (proveedor.vig_prov === true || proveedor.vig_prov === false) {
                update.push('vig_prov')
                params.push(proveedor.vig_prov)
            }
            if (update.length === 0) {
                return reject({ msj_error: 'Sin datos para modificar' })
            }

            params.push(proveedor.id_prov)
            const query = modificar('proveedores', update, 'id_prov')
            connection.query(query, params, function (error, result, field) {
                if (error) {
                    if (error.sqlMessage.includes('Duplicate')) {
                        return reject({ msj_error: 'Identificación o nombre ya registrado' })
                    }
                    return reject({ msj_error: 'Error del servidor', error: error })
                }
                resolve({ msj: 'Proveedor modificado con exito' })
            })
        })

    }

    eliminar(proveedor) {
        return new Promise((resolve, reject) => {
            if (!proveedor.id_prov) {
                return reject({ msj_error: 'ID requerido' })
            }
            const params = [false, proveedor.id_prov]
            const query = eliminar('proveedores', 'hab_prov', 'id_prov')
            connection.query(query, params, function (error, result, field) {
                if (error) {
                    return reject({ msj_error: 'Error al eliminar', error: error })
                }
                resolve({ msj: 'Eliminado con exito' })
            })
        })
    }

}


module.exports = new ProveedoresModels();