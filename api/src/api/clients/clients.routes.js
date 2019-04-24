const entity = "clients";
const router = require("express").Router();
const controller = require(`./${entity}.controller`);
const permit = require("../../middleware/permission");
const {
  authenticateGoogle
} = require("../../config/passport");

const Role = require("../../enums/roles.enum");

router.post("/signin", controller.signin);
router.get(
  "/current",
  permit([Role.User, Role.Admin, Role.Executor]),
  controller.current
);

router.post("/register", controller.register);
router.put("/confirm", controller.confirm);
router.put("/newVerificationCode", controller.newVerificationCode);

router.post("/google", authenticateGoogle(), controller.authSocialNetwork);

router.put("/edit", permit(Role.User), controller.edit);
router.put("/newPassword", permit(Role.User), controller.newPassword);

router.get("/", permit(Role.Admin), controller.get);

router.put("/:id/block", permit(Role.Admin), controller.block);
router.put("/:id/unblock", permit(Role.Admin), controller.unblock);

module.exports = router;
