const connection = require('../connection')
const { v4: uuidv4 } = require('uuid');
const { vacios, empty, incompletos, object_incomplete, object_vacios } = require('../utils/validacion')
const { crear, modificar } = require('../utils/consultas')

class VentasModels {
    detalle(venta) {
        return new Promise((resolve, reject) => {
            if (!venta.id_ven) {
               return reject({ msj: 'ID requerido' }) 
            }
            const query = 'SELECT d.id_ven, d.num_fac, v.tip_factura, d.descrip, d.tasa, d.monto_bs, d.monto_dolar, d.id_pag, d.fec_ven, d.aten_por, d.obs, c.nom_cli, c.ape_cli, c.tel_cli, c.iden, c.email, pa.id_pag, pa.met_ref FROM detalle_venta d INNER JOIN ventas v ON d.id_ven = v.id_ven INNER JOIN clientes c ON d.id_cli = c.id_cli INNER JOIN pagos pa ON d.id_pag = pa.id_pag WHERE d.id_ven = ?'
            const params = [venta.id_ven]
            connection.query(query, params, function(error, result){
                if (error) {
                     return reject({ msj: 'Error al consultar', error:error })
                }
                if (result.length === 0) {
                     return reject({ msj: 'Venta inexistente' })
                }
                resolve(result)
            })
        })
    }

    crear(venta) {
        return new Promise(async (resolve, reject) => {
            if (!venta.tip_factura | !venta.tasa || !venta.monto_bs | !venta.monto_dolar || !venta.id_pag || !venta.id_cli || !venta.ant_por || !venta.obs) {
                return reject({ msj: 'Datos incompletos' })
            }
            if (venta.descrip === undefined || venta.met_ref === null) {
                return reject({ msj: 'Datos incompletos' })
            }
            const id_ven = uuidv4()
            const fec_ven = new Date()
            const descrip = JSON.stringify(venta.descrip)
            const fields_det = ['id_ven', 'descrip', 'tasa', 'monto_bs', 'monto_dolar', 'id_pag', 'fec_ven', 'id_cli', 'aten_por', 'obs']
            const query_det = crear('detalle_venta', fields_det)
            const fields_ven = ['id_ven', 'tip_factura', 'monto_bs', 'monto_dolar', 'fec_ven', 'aten_por']
            const query_ven = crear('ventas', fields_ven)
            const params_det = [id_ven, descrip, venta.tasa, venta.monto_bs, venta.monto_dolar, venta.id_pag, fec_ven, venta.id_cli, venta.ant_por, venta.obs]
            const params_ven = [id_ven, venta.tip_factura, venta.monto_bs, venta.monto_dolar, fec_ven, venta.ant_por]
            const val_det = [venta.monto_bs, venta.monto_dolar, venta.tasa, venta.id_pag, fec_ven, venta.id_cli, venta.ant_por, venta.obs]
            const val_vacio_det = empty(val_det)
            const fields_prod = ['id_prod', 'cantidad', 'prec_uni', 'monto_prod']
            const data_complete = object_incomplete(venta.descrip, fields_prod)
            const obj_vacio = object_vacios(venta.descrip)
            const query_exi = 'SELECT existencia FROM productos WHERE id_prod = ?'
            const query_cant = 'UPDATE productos SET existencia = existencia - ? WHERE id_prod = ?'
            const field_graf = ['id_prod', 'cantidad', 'fec_prod_ven']
            const quer_graf = crear('graf_prod', field_graf)
            if (!obj_vacio) {
                return reject({ msj: 'No se pueden enviar datos vacíos' })
            }
            if (!val_vacio_det) {
                return reject({ msj: 'No se pueden enviar datos vacíos' })
            }
            if (!data_complete) {
                return reject({ msj: 'Datos de metodo de pago incompletos' })
            }
            connection.beginTransaction(async (error) => {
                if (error) return reject(error);
                try {
                    // FASE 1: Validación de existencias
                    for (const producto of venta.descrip) {
                        const result = await new Promise((resolve, reject) => {
                            connection.query(query_exi, [producto.id_prod], (error, result) => {
                                if (error) reject({ msj: 'Error al consultar', error });
                                else resolve(result);
                            });
                        });

                        if (result.length === 0) {
                            throw { msj: 'Producto inexistente' };
                        }
                        if (result[0].existencia < producto.cantidad) {
                            throw { msj: 'Cantidad insuficiente' };
                        }
                    }

                    // FASE 2: Procesamiento de ventas
                    for (const producto of venta.descrip) {
                        await new Promise((resolve, reject) => {
                            connection.query(query_cant, [producto.cantidad, producto.id_prod], (error) => {
                                if (error) reject(error);
                                else resolve();
                            });
                        });

                        await new Promise((resolve, reject) => {
                            connection.query(quer_graf, [producto.id_prod, producto.cantidad, fec_ven], (error) => {
                                if (error) reject(error);
                                else resolve();
                            });
                        });
                    }

                    // FASE 3: Registros finales
                    await new Promise((resolve, reject) => {
                        connection.query(query_det, params_det, (error) => {
                            if (error) reject(error);
                            else resolve();
                        });
                    });

                    await new Promise((resolve, reject) => {
                        connection.query(query_ven, params_ven, (error) => {
                            if (error) reject(error);
                            else resolve();
                        });
                    });

                    // Confirmar transacción
                    await new Promise((resolve, reject) => {
                        connection.commit((err) => {
                            if (err) reject(err);
                            else resolve();
                        });
                    });

                    resolve({ msj: 'Registrada con éxito' });

                } catch (error) {
                    // Rollback en caso de error
                    connection.rollback(() => {
                        reject(error);
                    });
                }
            });



        })
    }

    pago(venta) {
        return new Promise((resolve, reject) => {
            if (!venta.monto_bs || !venta.monto_dolar || venta.total) {
                return reject({ msj: 'Datos incompletos' })
            }
            if (venta.met_ref === undefined || venta.met_ref === null) {
                return reject({ msj: 'Datos incompletos' })
            }
            const hoal = 'hola'
            const id_pag = uuidv4()
            const fields = ['id_pag', 'monto_bs', 'monto_dolar', 'met_ref']
            const fields_pay = ['metodo', 'ref', 'moneda', 'monto']
            const data_complete = object_incomplete(venta.met_ref, fields_pay)
            const obj_vacio = object_vacios(venta.met_ref)
            const obj = JSON.stringify(venta.met_ref)
            const params = [id_pag, venta.monto_bs, venta.monto_dolar, obj]
            const val_pay = [venta.monto_bs, venta.monto_dolar]
            const data_pay = empty(val_pay)
            if (!data_pay) {
                return reject({ msj: 'No se pueden enviar datos vacíos' })
            }
            if (!obj_vacio) {
                return reject({ msj: 'No se pueden enviar datos vacíos' })
            }
            if (!data_complete) {
                return reject({ msj: 'Datos de metodo de pago incompletos' })
            }
            const query = crear('pagos', fields)
            try {
                connection.query(query, params, function (error, result) {
                    if (error) {
                        return reject({ msj: 'Error al registrar', error: error })
                    }
                    resolve({ msj: 'Pago registrado con exito' })
                })
            } catch (error) {
                reject(error)
            }
        })

    }


}


module.exports = new VentasModels();