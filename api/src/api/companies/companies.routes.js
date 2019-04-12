const entity = 'companies';

const router = require('express').Router();
const controller = require(`./${entity}.controller`);
const permit = require("../../middleware/permission");

const Role = require("../../enums/roles.enum");

router.post("/signin", controller.signin);
router.post("/signout", controller.signout);
router.post("/register", controller.register);
router.put("/confirm", controller.confirm);

router.put("/edit/main", permit(Role.Executor), controller.editMain);
router.put("/edit/typesOfCleaning", permit(Role.Executor), controller.editTypesOfCleaning);
router.put("/edit/newPassword", permit(Role.Executor), controller.newPassword);

router.get('/', controller.get); // get collection of companies
router.get('/:id', controller.getById);

router.put('/:id/block', permit(Role.Admin), controller.block);
router.put('/:id/unblock', permit(Role.Admin), controller.unblock);

router.put('/:id/rate', permit(Role.User), controller.rate);

module.exports = router;