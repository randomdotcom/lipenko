const entity = 'admin';

const router = require('express').Router();
const controller = require(`./${entity}.controller`);
const permit = require("../../middleware/permission");

const Role = require("../../enums/roles.enum");

router.get("/signin", controller.signin);
router.get("/signout", controller.signout);
router.post("/register", permit(Role.Admin), controller.register);

router.get("/only-admin", permit(Role.Admin), (req, res) => {
    res.send('admin access!');
})

// router.get('/', controller.get)
// router.get('/:id', controller.getById)
// router.post('/', controller.post)
// router.put('/:id', controller.put) // ?
// router.delete('/:id', controller.delete) // ?

module.exports = router;