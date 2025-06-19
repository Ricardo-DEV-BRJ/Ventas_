var express = require('express');
var router = express.Router();
const UsuariosController = require('../controllers/usuarios_con')

/* GET home page. */
router.get('/', function(req, res, next) {
  UsuariosController.todos()
    .then((result) => {
        res.send(result)
    }).catch((err) => {
         res.send(err)
    });
});

router.get('/roles', function(req, res, next) {
  UsuariosController.roles()
    .then((result) => {
        res.send(result)
    }).catch((err) => {
         res.send(err)
    });
});

router.post('/uno', function(req, res, next) {
  UsuariosController.uno(req.body)
    .then((result) => {
        res.send(result)
    }).catch((err) => {
         res.send(err)
    });
});

router.post('/registrar', function(req, res, next) {
  UsuariosController.registrar(req.body)
    .then((result) => {
        res.send(result)
    }).catch((err) => {
         res.send(err)
    });
});

router.post('/login', function(req, res, next) {
  UsuariosController.login(req.body)
    .then((result) => {
        res.status(200).send(result)
    }).catch((err) => {
         res.send(err)
    });
});

router.put('/modificar', function(req, res, next) {
  UsuariosController.modificar(req.body)
    .then((result) => {
        res.send(result)
    }).catch((err) => {
         res.send(err)
    });
});

router.delete('/eliminar', function(req, res, next) {
  UsuariosController.eliminar(req.body)
    .then((result) => {
        res.send(result)
    }).catch((err) => {
         res.send(err)
    });
});

module.exports = router;
