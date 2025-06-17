var express = require('express');
var router = express.Router();
const ProductosController = require('../controllers/productos_con')

router.get('/', function (req, res, next) {
    ProductosController.todos()
        .then((result) => {
            res.send(result)
        }).catch((err) => {
            res.send(err)
        });
});

router.post('/lote', function (req, res, next) {
    ProductosController.lote(req.body)
        .then((result) => {
            res.send(result)
        }).catch((err) => {
            res.send(err)
        });
});

router.post('/crear', function (req, res, next) {
    ProductosController.crear(req.body)
        .then((result) => {
            res.send(result)
        }).catch((err) => {
            res.send(err)
        });
});

router.put('/modificar', function (req, res, next) {
    ProductosController.modificar(req.body)
        .then((result) => {
            res.send(result)
        }).catch((err) => {
            res.send(err)
        });
});
router.put('/modificar_lote', function (req, res, next) {
    ProductosController.modificar_lote(req.body)
        .then((result) => {
            res.send(result)
        }).catch((err) => {
            res.send(err)
        });
});

router.delete('/eliminar', function (req, res, next) {
    ProductosController.eliminar(req.body)
        .then((result) => {
            res.send(result)
        }).catch((err) => {
            res.send(err)
        });
});

router.delete('/eliminar_lote', function (req, res, next) {
    ProductosController.eliminar_lote(req.body)
        .then((result) => {
            res.send(result)
        }).catch((err) => {
            res.send(err)
        });
});



module.exports = router;