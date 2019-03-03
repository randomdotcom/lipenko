const entity = 'companies';

const router = require('express').Router();
const controller = require(`./${entity}.controller`);
const permit = require("../../middleware/permission");

const Role = require("../../enums/roles.enum");

router.get("/signin", controller.signin);
router.get("/signout", controller.signout);
router.post("/register", controller.register);

router.get('/', permit(Role.Admin), controller.get); // get collection of companies

router.put('/block', permit(Role.Admin), controller.block);
router.put('/unblock', permit(Role.Admin), controller.unblock);

// router.get('/:id', controller.getById)
// router.post('/', controller.post)
// router.put('/:id', controller.put) // ?
// router.delete('/:id', controller.delete) // ?

module.exports = router;