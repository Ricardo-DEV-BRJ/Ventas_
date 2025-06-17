var express = require('express');
var router = express.Router();
const ClientesController = require('../controllers/clientes_con')

router.get('/', function (req, res, next) {
    ClientesController.todos()
        .then((result) => {
            res.send(result)
        }).catch((err) => {
            res.send(err)
        });
});

router.post('/crear', function (req, res, next) {
    ClientesController.crear(req.body)
        .then((result) => {
            res.send(result)
        }).catch((err) => {
            res.send(err)
        });
});

router.put('/modificar', function (req, res, next) {
    ClientesController.modificar(req.body)
        .then((result) => {
            res.send(result)
        }).catch((err) => {
            res.send(err)
        });
});


router.delete('/eliminar', function (req, res, next) {
    ClientesController.eliminar(req.body)
        .then((result) => {
            res.send(result)
        }).catch((err) => {
            res.send(err)
        });
});

module.exports = router;