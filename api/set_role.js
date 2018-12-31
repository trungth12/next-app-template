const { send, createError, run, json } = require('micro')
const cookie = require('cookie')
const jwtSecret = process.env.HASURA_GRAPHQL_JWT_SECRET
const domain = process.env.DOMAIN || 'localhost:3001'
const jwt = require('jsonwebtoken')
const profile = async (req, res) => {
  if (req.method !== 'POST') {
    send(res, 200, {})
  }
  const { role } = await json(req)
  const cookies = cookie.parse(String(req.headers.cookie))
  if (!('token' in cookies)) {
    throw createError(401, 'Authorization header missing')
  }

  const { token } = cookies
  let userData = {}
  try {
    userData = jwt.verify(token, jwtSecret)
  } catch (err) {
    throw createError(400, 'Invalid token')
  }

  try {
    const supportedRoles = userData.roles
    if (!supportedRoles.includes(role)) {
      throw createError(400, 'Invalid role')
    }
    res.setHeader('Set-Cookie', cookie.serialize('role', String(role), {
      domain,
      path: '/',
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 7 // 1 week
    }));
    send(res, 200, { role })
  } catch (error) {
    throw createError(error.statusCode, error.statusText)
  }
}

const handler = (req, res) => run(req, res, profile)
/*
if (!process.env.NOW_REGION) {
  var http = require('http');
  http.createServer(handler).listen(3001);
}
*/
module.exports = handler
