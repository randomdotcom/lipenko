const entity = "admin";

const router = require("express").Router();
const controller = require(`./${entity}.controller`);
const permit = require("../../middleware/permission");
const { transporter, from } = require("../../config/nodemailer");

const Role = require("../../enums/roles.enum");

router.get("/signin", controller.signin);
router.get("/signout", controller.signout);
router.post("/register", permit(Role.Admin), controller.register);
router.put("/edit", permit(Role.Admin), controller.edit);

router.get("/only-admin", permit(Role.Admin), (req, res) => {
  res.send("admin access!");
});

router.post("/test-email", permit(Role.Admin), (req, res) => {
  const mailOptions = {
    from: `${process.env.EMAIL}`, // sender address
    to: `${req.user.email}`, // list of receivers
    subject: "Subject of your email", // Subject line
    html: "<p>Your html here</p>" // plain text body
  };

  transporter.sendMail(mailOptions, function(err, info) {
    if (err) res.send(err);
    else return res.send(info);
  });
});

module.exports = router;
