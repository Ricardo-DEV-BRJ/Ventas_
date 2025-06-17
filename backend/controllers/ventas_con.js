const VentasModels = require('../models/ventas_models')

class VentasController {
    detalle(venta) {
        return new Promise((resolve, reject) => {
            VentasModels.detalle(venta)
            .then((result) => {
                resolve(result)
            }).catch((err) => {
                reject(err)
            });
        })
    }

    crear(venta) {
        return new Promise((resolve, reject) => {
            VentasModels.crear(venta)
            .then((result) => {
                resolve(result)
            }).catch((err) => {
                reject(err)
            });
        })

    }

    pago(venta) {
        return new Promise((resolve, reject) => {
            VentasModels.pago(venta)
            .then((result) => {
                resolve(result)
            }).catch((err) => {
                reject(err)
            });
        })

    }

    devolucion(venta) {
        return new Promise((resolve, reject) => {
            VentasModels.devolucion(venta)
            .then((result) => {
                resolve(result)
            }).catch((err) => {
                reject(err)
            });
        })

    }

    eliminar(venta) {
        return new Promise((resolve, reject) => {
            VentasModels.eliminar(venta)
            .then((result) => {
                resolve(result)
            }).catch((err) => {
                reject(err)
            });
        })
    }
}

module.exports = new VentasController();