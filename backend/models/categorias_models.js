const connection = require('../connection')
const { v4: uuidv4 } = require('uuid');
const { todos, crear, modificar, eliminar } = require('../utils/consultas')
const { vacios, incompletos } = require('../utils/validacion')

class CategoriasModels {
    todos() {
        return new Promise((resolve, reject) => {
            const query = todos('categorias', 'nom_cat', 'ASC')
            connection.query(query, function (error, result, field) {
                if (error) {
                    return reject({ msj: 'Error al consutlar', error: error })
                }
                if (result.length === 0) {
                    return reject({ msj: 'Sin datos para mostrar' })
                }
                resolve(result)
            })
        })
    }

    crear(categoria) {
        return new Promise((resolve, reject) => {
            const vacio = vacios(categoria)
            const data = Object.values(categoria)
            if (data.length != vacio) {
                return reject({ mjs: 'Debes agrergar un nombre' })
            }
            const id_cat = uuidv4()
            const hab_cat = true
            const params = [id_cat, categoria.nom_cat, hab_cat]
            const fields = ['id_cat', 'nom_cat', 'hab_cat']
            const query = crear('categorias', fields)
            const all_data = incompletos(params, fields)
            if (!all_data) {
                return reject({ msj: 'Datos incompletos' })
            }
            connection.query(query, params, function (error, result, field) {
                if (error) {
                    return reject({ msj: 'Error al consutlar', error: error })
                }
                resolve({ mjs: 'Categoria registrada con exito' })
            })
        })
    }

    modificar(categoria) {
        return new Promise((resolve, reject) => {
            const vacio = vacios(categoria)
            const data = Object.values(categoria)
            if (data.length != vacio) {
                return reject({ mjs: 'No se deben enviar datos vacíos' })
            }
            if (!categoria.id_cat) {
                return reject({ mjs: 'ID requerido' })
            }
            if (!categoria.nom_cat) {
                return reject({ msj: 'Sin datos para modificar' })
            }
            const params = [categoria.nom_cat, categoria.id_cat]
            const fields = ['nom_cat']
            const query = modificar('categorias', fields, 'id_cat')
            connection.query(query, params, function (error, result, field) {
                if (error) {
                    return reject({ msj: 'Error al modificar', error: error })
                }
                resolve({ mjs: 'Categoria modificada con exito' })
            })
        })
    }

    eliminar(categoria) {
        return new Promise((resolve, reject) => {
            if (!categoria.id_cat) {
                return reject({ mjs: 'ID requerido' })
            }
            const params = [false, categoria.id_cat]
            const fields = 'hab_cat'
            const query = eliminar('categorias', fields, 'id_cat')
            connection.query(query, params, function (error, result, field) {
                if (error) {
                    return reject({ msj: 'Error al modificar', error: error })
                }
                resolve({ mjs: 'Categoria eliminada con exito' })
            })
        })
    }

}

module.exports = new CategoriasModels();