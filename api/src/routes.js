const router = require('express').Router();
const { version } = require('../package.json')

router.get('/', (req, res) => {
    res.json({
        status: 'success',
        message: 'API',
        data: {
            version: `${version}`
        }
    })
})

router.use('/clients', require('./api/clients').router)
router.use('/companies', require('./api/companies').router)
router.use('/admin', require('./api/admin').router)
router.use('/orders', require('./api/orders').router)


module.exports = router;