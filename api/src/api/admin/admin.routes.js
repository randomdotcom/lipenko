const entity = "admin";
const router = require("express").Router();
const controller = require(`./${entity}.controller`);
const permit = require("../../middleware/permission");
const Role = require("../../enums/roles.enum");

router.post("/signin", controller.signin);
router.post("/register", permit(Role.Admin), controller.register);
router.put("/edit", permit(Role.Admin), controller.edit);

module.exports = router;
