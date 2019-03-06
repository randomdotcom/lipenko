const entity = 'orders';

const router = require('express').Router();
const controller = require(`./${entity}.controller`);
const permit = require("../../middleware/permission");

const Role = require("../../enums/roles.enum");

router.post('/create', permit(Role.User), controller.create);

router.put('/accept', permit(Role.Executor), controller.accept);
router.put('/cancel', permit([Role.User, Role.Executor]), controller.cancel);
router.put('/confirm', permit(Role.User), controller.confirm);

router.get('/', permit([Role.User, Role.Executor]), controller.get)
// router.get('/:id', controller.getById)
// router.post('/', controller.post)
// router.put('/:id', controller.put) // ?
// router.delete('/:id', controller.delete) // ?

module.exports = router;