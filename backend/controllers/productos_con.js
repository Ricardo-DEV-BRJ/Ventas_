const ProductosModels = require('../models/productos_model')

class ProductosController {
    todos() {
        return new Promise((resolve, reject) => {
            ProductosModels.todos()
                .then((result) => {
                    resolve(result)
                }).catch((err) => {
                    reject(err)
                });
        })
    }

    lote(producto) {
        return new Promise((resolve, reject) => {
            ProductosModels.lote(producto)
                .then((result) => {
                    resolve(result)
                }).catch((err) => {
                    reject(err)
                });
        })
    }

    crear(producto) {
        return new Promise((resolve, reject) => {
            ProductosModels.crear(producto)
                .then((result) => {
                    resolve(result)
                }).catch((err) => {
                    reject(err)
                });
        })
    }

    modificar(producto) {
        return new Promise((resolve, reject) => {
            ProductosModels.modificar(producto)
                .then((result) => {
                    resolve(result)
                }).catch((err) => {
                    reject(err)
                });
        })
    }
    modificar_lote(producto) {
        return new Promise((resolve, reject) => {
            ProductosModels.modificar_lote(producto)
                .then((result) => {
                    resolve(result)
                }).catch((err) => {
                    reject(err)
                });
        })
    }

    eliminar(producto) {
        return new Promise((resolve, reject) => {
            ProductosModels.eliminar(producto)
                .then((result) => {
                    resolve(result)
                }).catch((err) => {
                    reject(err)
                });
        })
    }
    
    eliminar_lote(producto) {
        return new Promise((resolve, reject) => {
            ProductosModels.eliminar_lote(producto)
                .then((result) => {
                    resolve(result)
                }).catch((err) => {
                    reject(err)
                });
        })
    }

}

module.exports = new ProductosController();