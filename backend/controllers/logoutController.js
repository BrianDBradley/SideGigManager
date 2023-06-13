const logout = (req, res) => {
    req.session.destroy((err) => {
        if (err) throw err
        res.redirect('/login')
    }) 
}

module.exports = logout