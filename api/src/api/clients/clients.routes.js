const entity = 'clients';

const router = require('express').Router();
const controller = require(`./${entity}.controller`);
const permit = require("../../middleware/permission");

const { authenticateGoogle, authenticateVKontakte, authenticateGitHub} = require('../../config/passport');

const Role = require("../../enums/roles.enum");

router.post("/signin", controller.signin);
router.post("/signout", controller.signout);

router.post("/register", controller.register);
router.put("/confirm", controller.confirm);
router.put("/newVerificationCode", controller.newVerificationCode)

router.get("/google", authenticateGoogle());
router.get("/google/callback", authenticateGoogle(), controller.authSocialNetwork);

// router.get("/github", authenticateGitHub());
// router.get("/github/callback", authenticateGitHub(), controller.authSocialNetwork);

// router.get("/vk", authenticateVKontakte());
// router.get("/vk/callback", authenticateVKontakte(), controller.authSocialNetwork);

router.put('/edit', permit(Role.User), controller.edit);

router.get('/', permit(Role.Admin), controller.get);

router.put('/:id/block', permit(Role.Admin), controller.block);
router.put('/:id/unblock', permit(Role.Admin), controller.unblock);


module.exports = router;