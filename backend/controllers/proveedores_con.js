const ProveedoresModels = require('../models/proveedores_models')

class ProveedoresController {
    todos() {
        return new Promise((resolve, reject) => {
            ProveedoresModels.todos()
                .then((result) => {
                    resolve(result)
                }).catch((err) => {
                    reject(err)
                });
        })

    }

    uno(proveedor) {
        return new Promise((resolve, reject) => {
            ProveedoresModels.uno(proveedor)
                .then((result) => {
                    resolve(result)
                }).catch((err) => {
                    reject(err)
                });
        })
    }

    crear(proveedor) {
        return new Promise((resolve, reject) => {
            ProveedoresModels.crear(proveedor)
                .then((result) => {
                    resolve(result)
                }).catch((err) => {
                    reject(err)
                });
        })
    }

    modificar(proveedor) {
        return new Promise((resolve, reject) => {
            ProveedoresModels.modificar(proveedor)
                .then((result) => {
                    resolve(result)
                }).catch((err) => {
                    reject(err)
                });
        })

    }

    eliminar(proveedor) {
        return new Promise((resolve, reject) => {
            ProveedoresModels.eliminar(proveedor)
                .then((result) => {
                    resolve(result)
                }).catch((err) => {
                    reject(err)
                });
        })

    }

}

module.exports = new ProveedoresController();