const connection = require('../connection')
const { v4: uuidv4 } = require('uuid');
const { todos, crear, modificar, eliminar } = require('../utils/consultas')
const { vacios, incompletos } = require('../utils/validacion')

class ClientesModels {
    todos() {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM clientes WHERE hab_cli = ?'
            try {
                connection.query(query, [1], function (error, result) {
                    if (error) {
                        return reject({ msj_error: 'Error al consultar' })
                    }
                    resolve(result)
                })
            } catch (error) {
                reject(error)
            }
        })
    }

    crear(cliente) {
        return new Promise((resolve, reject) => {
            const vacio = vacios(cliente)
            const data = Object.values(cliente)
            if (data.length != vacio) {
                return reject({ msj_error: "No se pueden enviar datos vacios" })
            }
            try {
                const id_cli = uuidv4()
                const hab_cli = true
                const field = ['id_cli', 'nom_cli', 'ape_cli', 'iden', 'tel_cli', 'email', 'hab_cli']
                const query = crear('clientes', field)
                const params = [id_cli, cliente.nom_cli, cliente.ape_cli, cliente.iden, cliente.tel_cli, cliente.email, hab_cli]
                const all_data = incompletos(params, field)
                if (!all_data) {
                    return reject({ msj_error: "Datos incompletos" })
                }

                connection.query(query, params, function (error, result) {
                    if (error) {
                        if (error.sqlMessage.includes('Duplicate')) {
                            return reject({ msj_error: 'Identificación duplicada' })
                        }
                        return reject({ msj_error: 'Error al crear cliente', error: error })
                    }
                    resolve({ msj: 'Cliente creado con éxito' })
                })
            } catch (error) {
                reject(error)
            }
        })
    }

    modificar(cliente) {
        return new Promise((resolve, reject) => {
            const vacio = vacios(cliente)
            const data = Object.values(cliente)
            if (data.length != vacio) {
                return reject({ msj_error: "No se pueden enviar datos vacios" })
            }
            if (!cliente.id_cli) {
                return reject({ msj_error: 'ID requerido' })
            }
            let update = []
            let params = []

            if (cliente.nom_cli) {
                update.push('nom_cli')
                params.push(cliente.nom_cli)
            }
            if (cliente.ape_cli) {
                update.push('ape_cli')
                params.push(cliente.ape_cli)
            }
            if (cliente.iden) {
                update.push('iden')
                params.push(cliente.iden)
            }
            if (cliente.tel_cli) {
                update.push('tel_cli')
                params.push(cliente.tel_cli)
            }
            if (cliente.email) {
                update.push('email')
                params.push(cliente.email)
            }
            if (cliente.hab_cli) {
                update.push('hab_cli')
                params.push(cliente.hab_cli)
            }
            console.log(update)
            params.push(cliente.id_cli)
            if (update.length === 0) {
                return reject({ msj_error: "Sin datos para modificar" })
            }
            try {
                const query = modificar('clientes', update, 'id_cli')
                connection.query(query, params, function (error, result) {
                    if (error) {
                        return reject({ msj_error: 'Error al modificar', error: error })
                    }
                    if (result.affectedRows === 0) {
                        return reject({ msj_error: 'Cliente no encontrado' })
                    }
                    resolve({ msj: 'Modificado con exito' })
                })
            } catch (error) {
                reject(error)
            }

        })
    }

    eliminar(cliente) {
        return new Promise((resolve, reject) => {
            if (!cliente.id_cli) {
                return reject({ msj_error: 'ID requerido' })
            }
            const params = [false, cliente.id_cli]
            const query = eliminar('clientes', 'hab_cli', 'id_cli')
            connection.query(query, params, function(error, result){
                if (error) {
                        return reject({ msj_error: 'Error al eliminar', error: error })
                    }
                    if (result.affectedRows === 0) {
                        return reject({ msj_error: 'Cliente no encontrado' })
                    }
                    resolve({ msj: 'Eliminado con exito' })
            })
        })
    }

}

module.exports = new ClientesModels();