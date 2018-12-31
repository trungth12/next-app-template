const { send, createError, run, json } = require('micro')
const cookie = require('cookie')
const domain = process.env.DOMAIN || 'localhost:3001'

const profile = async (req, res) => {
  if (req.method !== 'POST') {
    send(res, 200, {})
  }
  const { language } = await json(req)

  try {
    res.setHeader('Set-Cookie', cookie.serialize('language', String(language), {
      domain,
      path: '/',
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 7 // 1 week
    }));
    send(res, 200, { language })
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
