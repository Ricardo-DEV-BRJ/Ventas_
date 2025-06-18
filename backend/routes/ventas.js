var express = require('express');
var router = express.Router();
const VentasController = require('../controllers/ventas_con')

router.post('/detalle', function (req, res, next) {
    VentasController.detalle(req.body)
        .then((result) => {
            res.status(200).send(result)
        }).catch((err) => {
            res.send(err)
        });
});

router.post('/crear', function (req, res, next) {
    VentasController.crear(req.body)
        .then((result) => {
            res.send(result)
        }).catch((err) => {
            res.send(err)
        });
});

router.post('/pago', function (req, res, next) {
    VentasController.pago(req.body)
        .then((result) => {
            res.send(result)
        }).catch((err) => {
            res.send(err)
        });
});

router.post('/devolucion', function (req, res, next) {
    VentasController.devolucion(req.body)
        .then((result) => {
            res.send(result)
        }).catch((err) => {
            res.send(err)
        });
});
router.post('/devolucion_uno', function (req, res, next) {
    VentasController.devolucion_uno(req.body)
        .then((result) => {
            res.send(result)
        }).catch((err) => {
            res.send(err)
        });
});

module.exports = router;