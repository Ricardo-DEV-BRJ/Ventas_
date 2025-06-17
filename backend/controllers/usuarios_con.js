const UsuariosModels = require('../models/usuarios_models')

class UsuariosController {

    registrar(usuario) {
        return new Promise((resolve, reject) => {
            UsuariosModels.registrar(usuario)
                .then((result) => {
                    resolve(result)
                }).catch((err) => {
                    reject(err)
                });
        })
    }

    login(usuario) {
        return new Promise((resolve, reject) => {
            UsuariosModels.login(usuario)
                .then((result) => {
                    resolve(result)
                }).catch((err) => {
                    reject(err)
                });
        })
    }

    todos() {
        return new Promise((resolve, reject) => {
            UsuariosModels.todos()
                .then((result) => {
                    resolve(result)
                }).catch((err) => {
                    reject(err)
                });
        })
    }

    uno(usuario) {
        return new Promise((resolve, reject) => {
            UsuariosModels.uno(usuario)
                .then((result) => {
                    resolve(result)
                }).catch((err) => {
                    reject(err)
                });
        })
    }

    modificar(usuario) {
        return new Promise((resolve, reject) => {
            UsuariosModels.modificar(usuario)
                .then((result) => {
                    resolve(result)
                }).catch((err) => {
                    reject(err)
                });
        })
    }

    eliminar(usuario) {
        return new Promise((resolve, reject) => {
            UsuariosModels.eliminar(usuario)
                .then((result) => {
                    resolve(result)
                }).catch((err) => {
                    reject(err)
                });
        })
    }
    roles() {
        return new Promise((resolve, reject) => {
            UsuariosModels.roles()
                .then((result) => {
                    resolve(result)
                }).catch((err) => {
                    reject(err)
                });
        })
    }


}

module.exports = new UsuariosController();