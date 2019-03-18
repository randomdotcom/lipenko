const entity = 'companies';

const router = require('express').Router();
const controller = require(`./${entity}.controller`);
const permit = require("../../middleware/permission");

const Role = require("../../enums/roles.enum");

router.post("/signin", controller.signin);
router.post("/signout", controller.signout);
router.post("/register", controller.register);
router.put("/confirm", controller.confirm)

router.put("/edit", permit(Role.Executor), controller.edit);

router.get('/', controller.get); // get collection of companies
router.get('/:id', controller.getById);

router.put('/:id/block', permit(Role.Admin), controller.block);
router.put('/:id/unblock', permit(Role.Admin), controller.unblock);

router.put('/:id/rate', permit(Role.User), controller.rate);

module.exports = router;