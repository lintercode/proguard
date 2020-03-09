
const { User } = require('../model')

const isAuthorized = async (req, res, next)=>{
    const username = req.session.username
    
    // for local authorization, you can use this middleware to check if a user is logged or not, if there are logged in moved to the next middleware
    // Otherwise, redirect them to the login page
    // basic example with mysql
    // connection.query("SELECT username FROM users where email = ?", [email], (err, result)=>{
    //     if (result.length>0){
    //         next()
    //     }else{
    //         res.redirect("/admin/login")
    //     }
    // })
  
    // Another basic example with mongoose
    const data = await User.findOne({ email })
    if (data) {
        next()
    } else { 
        res.redirect("/login")
    }
  });