const entity = 'orders';

const router = require('express').Router();
const controller = require(`./${entity}.controller`);

router.get('/', controller.get)
router.get('/:id', controller.getById)
router.post('/', controller.post)
router.put('/:id', controller.put) // ?
router.delete('/:id', controller.delete) // ?

module.exports = router;