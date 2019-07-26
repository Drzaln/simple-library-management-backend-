const jwt = require('jsonwebtoken')
const resp = require('./response')

const allowedAccess = process.env.REQUEST_HEADERS

module.exports ={
    authInfo: (req, res, next) => {
        const headerAuth = req.headers['authorization']
        const headerSecret = req.headers['x-token']

        if (headerAuth !== allowedAccess) {
            // return resp.response(res, null, 401, 'Unauthorized, Need access token')
            res.json('Need access token')
        } else if (typeof headerSecret === 'undefined') {
            next()
        }else{
            const bearerToken = headerSecret.split(' ')
            const token = bearerToken[1]
            req.token = token
            console.log('Token stored', token)
            next()
        }
    },

    accessToken: (req, res, next) => {
        const secretKey = process.env.SECRET_KEY
        const accessToken = req.token
        const userToken = req.headers['x-user']

        jwt.verify(accessToken, secretKey, (err, decoded) => {
            if (err && err.name === 'TokenExpiredError') {
                // return resp.response(res, null, 401, 'Token expired')
                res.json('Token expired')
            }

            if (err && err.name === 'JsonWebTokenError') {
                // return resp.response(res, null, 401, 'Invalid Token')
                res.json('Invalid token')
            }

            if (parseInt(userToken) !== parseInt(decoded.id_user)) {
                // return resp.response(res, null, 401, 'Invalid User Token')
                res.json('Invalid user token')
            }

            console.log(`decoded `,decoded)
            next()
        })
    }
}