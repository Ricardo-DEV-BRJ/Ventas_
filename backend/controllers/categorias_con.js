const CategoriasModels = require('../models/categorias_models')

class CategoriasController {
    todos() {
        return new Promise((resolve, reject) => {
            CategoriasModels.todos()
                .then((result) => {
                    resolve(result)
                }).catch((err) => {
                    reject(err)
                });
        })
    }

    uno(categoria) {
        return new Promise((resolve, reject) => {
            CategoriasModels.uno(categoria)
                .then((result) => {
                    resolve(result)
                }).catch((err) => {
                    reject(err)
                });
        })
    }

    crear(categoria) {
        return new Promise((resolve, reject) => {
            CategoriasModels.crear(categoria)
                .then((result) => {
                    resolve(result)
                }).catch((err) => {
                    reject(err)
                });
        })
    }

    modificar(categoria) {
        return new Promise((resolve, reject) => {
            CategoriasModels.modificar(categoria)
                .then((result) => {
                    resolve(result)
                }).catch((err) => {
                    reject(err)
                });
        })
    }

    eliminar(categoria) {
        return new Promise((resolve, reject) => {
            CategoriasModels.eliminar(categoria)
                .then((result) => {
                    resolve(result)
                }).catch((err) => {
                    reject(err)
                });
        })
    }

}

module.exports = new CategoriasController();