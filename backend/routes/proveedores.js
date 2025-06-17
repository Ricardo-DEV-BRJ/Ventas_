var express = require('express');
var router = express.Router();
const ProveedoresController = require('../controllers/proveedores_con')


router.get('/', function (req, res, next) {
    ProveedoresController.todos()
        .then((result) => {
            res.send(result)
        }).catch((err) => {
            res.send(err)
        });
});

router.post('/uno', function (req, res, next) {
    ProveedoresController.uno(req.body)
        .then((result) => {
            res.send(result)
        }).catch((err) => {
            res.send(err)
        });
});

router.post('/crear', function (req, res, next) {
    ProveedoresController.crear(req.body)
        .then((result) => {
            res.send(result)
        }).catch((err) => {
            res.send(err)
        });
});

router.put('/modificar', function (req, res, next) {
    ProveedoresController.modificar(req.body)
        .then((result) => {
            res.send(result)
        }).catch((err) => {
            res.send(err)
        });
});

router.delete('/eliminar', function (req, res, next) {
    ProveedoresController.eliminar(req.body)
        .then((result) => {
            res.send(result)
        }).catch((err) => {
            res.send(err)
        });
});



module.exports = router;