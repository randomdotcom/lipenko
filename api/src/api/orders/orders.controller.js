module.exports.get = async (req, res) => {
    res.send(`get collection of orders`)
}

module.exports.getById = async (req, res) => {
    res.send(`get order ${req.params.id}`)
}

module.exports.post = async (req, res) => {
    res.send('create order')
}

module.exports.put = async (req, res) => {
    res.send('edit order')
}

module.exports.delete = async (req, res) => {
    res.send('delete order')
}