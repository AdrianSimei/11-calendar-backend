/**
 * events Routes
 * /api/events
 * 
 */

const { Router } = require('express');
const { check } = require('express-validator')


const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { getEventos, crearEvento, actualizarEvento, eliminarEvento } = require('../controllers/events');
const { isDate } = require('../helpers/isDate');

const router = Router();


//Todas deben pasar por la validacion
router.use(validarJWT);


//Obtner eventos 
router.get('/', getEventos);

//Crear un nuevo evento
router.post(
    '/',
    [
        check('title', 'El titulo es obligatorio').not().isEmpty(),
        check('start', 'Fecha de inicio es obligatoria').custom(isDate),
        check('end', 'Fecha de finalización es obligatoria').custom(isDate),

        validarCampos
    ],
    crearEvento
);

//actualizar evento
router.put('/:id', actualizarEvento);

//borrar Evento 
router.delete('/:id', eliminarEvento);

module.exports = router;
