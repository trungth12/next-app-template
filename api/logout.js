const cookie = require('cookie')
const domain = process.env.DOMAIN || 'localhost:3000'
const { send, run } = require('micro')
const logout = async (req, res) => {
  if (req.method !== 'POST') {
    send(res, 200, {})
  }
  const cookieOptions = {
    domain,
    path: '/',
    httpOnly: true,
    maxAge: 1
  }
  const tokenCookie = cookie.serialize('token', null, cookieOptions)
  const roleCookie = cookie.serialize('role', null, cookieOptions)
  res.setHeader('Set-Cookie', [tokenCookie, roleCookie]);      
  send(res, 200, {})
}
const handler = (req, res) => run(req, res, logout)
/*

if (!process.env.NOW_REGION) {
  var http = require('http');
  http.createServer(handler).listen(3001);
}
*/

module.exports = handler
