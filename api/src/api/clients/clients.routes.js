const entity = 'clients';

const router = require('express').Router();
const controller = require(`./${entity}.controller`);
const permit = require("../../middleware/permission");

const Role = require("../../enums/roles.enum");

router.get("/signin", controller.signin);
router.get("/signout", controller.signout);
router.post("/register", controller.register);
router.put('/edit', permit(Role.User), controller.edit);

router.get('/', permit(Role.Admin), controller.get);

router.put('/block', permit(Role.Admin), controller.block);
router.put('/unblock', permit(Role.Admin), controller.unblock);


module.exports = router;