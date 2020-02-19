require('dotenv').config()

const config = {
  LocalConfig: {
    DB_URL: process.env.DB_URL,
    PORT: process.env.PORT || 5000,
    SECRET: process.env.SECRET
  },

  FacebookConfig: {
    clientID: process.env.CLIENTID,
    clientSecret: process.env.CLIENTSECRET,
    callbackURL: `http://localhost:${process.env.PORT}/auth/facebook/callback`
  }
}

module.exports = config
