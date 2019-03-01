module.exports.get = async (req, res) => {
    res.send(`get collection of companies`)
}

module.exports.getById = async (req, res) => {
    res.send(`get company ${req.params.id}`)
}

module.exports.post = async (req, res) => {
    res.send('create company')
}

module.exports.put = async (req, res) => {
    res.send('edit company')
}

module.exports.delete = async (req, res) => {
    res.send('delete company')
}