const connection = require('../connection')
const { v4: uuidv4 } = require('uuid');
const { uno, crear, modificar, eliminar } = require('../utils/consultas')
const { vacios } = require('../utils/validacion')

class ProductosModels {
    todos() {
        return new Promise((resolve, reject) => {
            const query = 'SELECT e.id_prod, p.nom_prod, c.id_cat, c.nom_cat, pr.id_prov, pr.nom_prov, SUM(e.cantidad) AS total_existencia, AVG(e.prec_uni) AS precio_promedio FROM existencia e INNER JOIN productos p ON e.id_prod = p.id_prod INNER JOIN categorias c ON p.id_cat = c.id_cat INNER JOIN proveedores pr ON p.id_prov = pr.id_prov WHERE p.hab_prod = ? GROUP BY e.id_prod, p.nom_prod, c.nom_cat;'
            connection.query(query, [1], function (error, result, field) {
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

    lote(producto) {
        return new Promise((resolve, reject) => {
            if (!producto.id_prod) {
                return reject({ mjs: 'ID requerido' })
            }
            const param = [producto.id_prod]
            const query = uno('existencia', 'id_prod')

            connection.query(query, param, function (error, result) {
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

    crear(producto) {
        return new Promise(async (resolve, reject) => {
            const vacio = vacios(producto)
            const data = Object.values(producto)
            if (data.length != vacio) {
                return reject({ msj: 'No se deben enviar datos vacíos' })
            }
            try {
                const id_prod = uuidv4()
                const id_prod_exi = uuidv4()
                const fec_lote = new Date()
                const queryChekout = 'SELECT id_prod FROM productos WHERE nom_prod = ? AND id_prov = ? AND id_cat = ?'
                const prod = [producto.nom_prod, producto.id_prov, producto.id_cat]
                let params = [id_prod, producto.nom_prod, producto.id_cat, producto.id_prov, producto.cantidad, true]
                let paramsExis = [id_prod_exi, id_prod, producto.cantidad, producto.cod_lote, fec_lote, producto.prec_uni_bs, producto.prec_uni_dolar]
                const fields = ['id_prod', 'nom_prod', 'id_cat', 'id_prov', 'existencia', 'hab_prod']
                const query = crear('productos', fields)
                const fieldsExis = ['id_prod_exi', 'id_prod', 'cantidad', 'cod_lote', 'fec_lote', 'prec_uni_bs', 'prec_uni_dolar']
                const queryExis = crear('existencia', fieldsExis)
                let new_prod = true;
                let allData = params.length + paramsExis.length
                let data = fields.length + fieldsExis.length
                if (allData != data) {
                    return reject({ msj: 'Datos incompletos' })
                }
                connection.query(queryChekout, prod, function (error, result, field) {
                    if (error) {
                        return reject({ msj: 'Error al consutlar', error: error })
                    }
                    if (result.length > 0) {
                        params.splice(0, 1, result[0].id_prod)
                        paramsExis.splice(1, 1, result[0].id_prod)
                        new_prod = false
                    }
                    if (new_prod) {
                        connection.query(query, params, function (error) {
                            if (error) {
                                return reject({ msj: 'Error al consutlar', error: error })
                            }
                        })
                    } else {
                        const prod_query = 'UPDATE productos SET existencia = existencia + ? WHERE id_prod = ?'
                        connection.query(prod_query, [producto.cantidad, params[0]], function (error) {
                            if (error) {
                                return reject({ msj: 'Error al consutlar', error: error })
                            }
                        })
                    }
                    connection.query(queryExis, paramsExis, function (result, error) {
                        if (error) {
                            return reject({ msj: 'Error al consutlar', error: error })
                        }
                    })
                    resolve({ mjs: 'Producto agregado con exito' })
                })
            } catch (error) {
                reject(error)
            }
        })
    }

    modificar(producto) {
        return new Promise((resolve, reject) => {
            if (!producto.id_prod) {
                return reject({ mjs: 'ID requerido' })
            }
            const vacio = vacios(producto)
            const data = Object.values(producto)
            if (data.length != vacio) {
                return reject({ msj: 'No se deben enviar datos vacíos' })
            }

            let update = []
            let params = []

            if (producto.nom_prod) {
                update.push('nom_prod')
                params.push(producto.nom_prod)
            }
            if (producto.id_prov) {
                update.push('id_prov')
                params.push(producto.id_prov)
            }
            if (producto.id_cat) {
                update.push('id_cat')
                params.push(producto.id_cat)
            }
            if (producto.hab_prod) {
                update.push('hab_prod')
                params.push(producto.hab_prod)
            }
            if (update.length === 0) {
                return reject({ msj: 'Sin datos para modificar' })
            }
            params.push(producto.id_prod)
            const query = modificar('productos', update, 'id_prod')
            connection.query(query, params, function (error, result, field) {
                if (error) {
                    return reject({ msj: 'Error al modificar', error: error })
                }
                resolve({ mjs: 'producto modificada con exito' })
            })
        })
    }

    modificar_lote(producto) {
        return new Promise((resolve, reject) => {
            if (!producto.id_prod_exi) {
                return reject({ mjs: 'ID requerido' })
            }
            let update_exi = []
            let params_exi = []

            if (producto.id_prod) {
                update_exi.push('id_prod')
                params_exi.push(producto.nom_prod)
            }
            if (producto.cantidad) {
                update_exi.push('cantidad')
                params_exi.push(producto.cantidad)
            }
            if (producto.cod_lote) {
                update_exi.push('cod_lote')
                params_exi.push(producto.cod_lote)
            }
            if (producto.fec_lote) {
                update_exi.push('fec_lote')
                params_exi.push(producto.cod_lote)
            }
            if (producto.prec_uni) {
                update_exi.push('prec_uni_bs')
                params_exi.push(producto.prec_uni_bs)
            }
            if (producto.prec_uni) {
                update_exi.push('prec_uni_dolar')
                params_exi.push(producto.prec_uni_dolar)
            }

            if (update_exi.length === 0) {
                return reject({ msj: 'Sin datos para modificar' })
            }

            params_exi.push(producto.id_prod_exi)
            const query = modificar('existencia', update_exi, 'id_prod_exi')
            connection.query(query, params_exi, function (error, result, field) {
                if (error) {
                    return reject({ msj: 'Error al modificar', error: error })
                }
                resolve({ mjs: 'producto modificada con exito' })
            })
        })
    }

    eliminar(producto) {
        return new Promise((resolve, reject) => {
            if (!producto.id_prod) {
                return reject({ mjs: 'ID requerido' })
            }
            const params = [false, producto.id_prod]
            const query = eliminar('productos', 'hab_prod', 'id_prod')
            connection.query(query, params, function (error, result) {
                if (error) {
                    return reject({ msj: 'Error al eliminar producto', error: error })
                }
                resolve({ msj: 'Eliminado con exito' })
            })
        })
    }

    eliminar_lote(producto) {
        return new Promise((resolve, reject) => {
            if (!producto.id_prod_exi) {
                return reject({ mjs: 'ID requerido' })
            }
            const query = 'DELETE FROM existencia WHERE id_prod_exi = ?'
            const params = [producto.id_prod_exi]
            connection.query(query, params, function (error, result) {
                if (error) {
                    return reject({ msj: 'Error al eliminar', error: error })
                }
                if (result.affectedRows === 0) {
                    return reject({ msj: 'ID no encontrado' })
                }
                resolve({ msj: 'Eliminado con exito' })
            })
        })
    }

}

module.exports = new ProductosModels();