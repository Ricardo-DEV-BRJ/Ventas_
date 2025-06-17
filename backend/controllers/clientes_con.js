const ClientesModels = require('../models/clientes_models')

class ClientesController {
     todos() {
        return new Promise((resolve, reject) => {
            ClientesModels.todos()
            .then((result) => {
                resolve(result)
            }).catch((err) => {
                reject(err)
            });
        })
    }

    crear(cliente) {
        return new Promise((resolve, reject) => {
             ClientesModels.crear(cliente)
            .then((result) => {
                resolve(result)
            }).catch((err) => {
                reject(err)
            });
        })
    }

    modificar(cliente) {
        return new Promise((resolve, reject) => {
            ClientesModels.modificar(cliente)
            .then((result) => {
                resolve(result)
            }).catch((err) => {
                reject(err)
            });
        })
    }

    eliminar(cliente) {
        return new Promise((resolve, reject) => {
             ClientesModels.eliminar(cliente)
            .then((result) => {
                resolve(result)
            }).catch((err) => {
                reject(err)
            });
        })
    }

}

module.exports = new ClientesController();