
const { User } = require('../model')

// Protects routes that requires logged access
const isAuthorized = async (req, res, next)=>{

    // Assumming the email is in the session
    const email = req.session.email
    // Another basic example with mongoose
    const data = await User.findOne({ email })
    if (data) {
        next()
    } else { 
        res.redirect("/login")
    }
  });