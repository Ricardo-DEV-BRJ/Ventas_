const connection = require('../connection')
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken')
require('dotenv').config()

class UsuariosModels {
    registrar(usuario) {
        return new Promise(async (resolve, reject) => {
            if (!usuario.iden || !usuario.nom_usu || !usuario.ape_usu || !usuario.usuario || !usuario.clave || !usuario.id_rol) {
                return reject({ msj: 'Datos incompletos' })
            }
            const id_usu = uuidv4();
            const hash = bcrypt.hashSync(usuario.clave, saltRounds)
            const fec_usu = new Date()
            const hab_usu = true
            const params = [id_usu, usuario.iden, usuario.nom_usu, usuario.ape_usu, usuario.usuario, hash, usuario.id_rol, hab_usu, fec_usu]
            const query = 'INSERT INTO usuarios (id_usu, iden, nom_usu, ape_usu, usuario, clave, id_rol, hab_usu, fec_usu) VALUES (?,?,?,?,?,?,?,?,?)'
            connection.query(query, params, function (error, result, field) {
                if (error) {
                    if (error.sqlMessage.includes('Duplicate')) {
                        return reject({ msj: 'Usuario o cedula ya existentes' })

                    }
                    return reject({ msj: 'Error al registrar', error: error })
                }
                resolve({ msj: 'Registrado con exito' })
            })

        })
    }

    login(usuario) {
        return new Promise(async (resolve, reject) => {
            if (!usuario.usuario || !usuario.clave) {
                return reject({ msj: 'Datos incompletos' })
            }
            const params = [usuario.usuario]
            const query = 'SELECT u.id_usu, u.nom_usu, u.ape_usu, u.usuario, r.nom_rol, u.clave, u.hab_usu FROM usuarios u INNER JOIN roles r ON u.id_rol = r.id_rol WHERE usuario = ?'
            const data = await new Promise((resolve, reject) => {
                connection.query(query, params, function (error, result, field) {
                    if (error) {
                        return reject({ msj: 'Error del servidor', error: error })
                    }
                    if (result.length === 0) {
                        return reject({ msj: 'Usuario no encontrado' })
                    }
                    if (result[0].hab_usu === 0) {
                        return reject({ msj: 'Usuario inactivo' })
                    }
                    resolve(result)
                })
            })
            const clave = data[0].clave
            const passwordMatch = await bcrypt.compare(usuario.clave, clave);
            console.log(clave)
            console.log(usuario.clave)


            resolve({ msj: 'Ingreso con exito', token: passwordMatch })

            // if (!access) {
            //     return reject({ msj: 'Contraseña incorrecta' })
            // } else {
            //     const token = jwt.sign({ id_usu: data[0].id_usu, nom_usu: data[0].nom_usu, ape_usu: data[0].ape_usu, rol: data[0].nom_rol }, process.env.SECRET_JWT)
            //     resolve(token)
            // }

        })
    }

    todos() {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM usuarios ORDER BY hab_usu DESC'
            connection.query(query, function (error, result, field) {
                if (error) {
                    return reject({ mjs: 'Error al consultar', error: error })
                }
                if (result.length === 0) {
                    return reject({ msj: 'Sin usuarios registrados' })
                }
                const data = result.map((item) => ({
                    ...item,
                    hab_usu: item.hab_usu === 1 ? true : false
                }))
                console.log(data)
                resolve(data)
            })
        })
    }

    uno(usuario) {
        return new Promise((resolve, reject) => {
            if (!usuario.id_usu) {
                return reject({ msj: 'ID requerido' })
            }
            const params = [usuario.id_usu]
            const query = 'SELECT * FROM usuarios WHERE id_usu = ?'
            connection.query(query, params, function (error, result, field) {
                if (error) {
                    return reject({ msj: 'Error del servidor', error: error })
                }
                if (result.length === 0) {
                    return reject({ msj: 'Usuario no encontrado' })
                }
                resolve(result)
            })
        })
    }

    modificar(usuario) {
        return new Promise((resolve, reject) => {
            if (!usuario.id_usu || usuario.id_usu.trim() === '') {
                return reject({ mjs: 'ID requerido' })
            }
            let update = []
            let params = []
            if (usuario.iden && usuario.iden.trim() != '') {
                update.push('iden = ?')
                params.push(usuario.iden.trim())
            }

            if (usuario.nom_usu && usuario.nom_usu.trim() != '') {
                update.push('nom_usu = ?')
                params.push(usuario.nom_usu.trim())
            }

            if (usuario.ape_usu && usuario.ape_usu.trim() != '') {
                update.push('ape_usu = ?')
                params.push(usuario.ape_usu.trim())
            }

            if (usuario.id_rol && usuario.id_rol.trim() != '') {
                update.push('id_rol = ?')
                params.push(usuario.id_rol.trim())
            }

            if (usuario.hab_usu === true) {
                update.push('hab_usu = ?')
                params.push(usuario.hab_usu)
            }
            if (usuario.hab_usu === false) {
                update.push('hab_usu = ?')
                params.push(usuario.hab_usu)
            }

            params.push(usuario.id_usu)
            if (params.length === 1) {
                return reject({ msj: 'Sin datos para modificar' })
            }

            const query = `UPDATE usuarios SET ${update.join(', ')} WHERE id_usu = ?`
            connection.query(query, params, function (error, result, field) {
                if (error) {
                    if (error.sqlMessage.includes('Duplicate')) {
                        return reject({ msj: 'Identificación duplicada' })
                    }
                    return reject({ msj: 'Error al modificar', error: error })
                }
                resolve({ msj: 'Modificado con exito' })
            })

        })
    }

    eliminar(usuario) {
        return new Promise((resolve, reject) => {
            if (!usuario.id_usu || usuario.id_usu.trim() === '') {
                return reject({ mjs: 'ID requerido' })
            }
            const params = [false, usuario.id_usu]
            const query = 'UPDATE usuarios SET hab_usu = ? WHERE id_usu = ?'
            connection.query(query, params, function (error, result, field) {
                if (error) {
                    return reject({ msj: 'Error al eliminar', error: error })
                }
                resolve({ msj: 'Eliminado con exito' })
            })
        })
    }

    roles() {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM roles'
            connection.query(query, function (error, result, field) {
                if (error) {
                    return reject({ msj: 'Error al consultar' })
                }
                resolve(result)
            })
        })
    }
}

module.exports = new UsuariosModels();