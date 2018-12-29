//const not_now = !process.env.NOW_REGION
//const mobile_host = not_now ? 'm.ihs.edu.vn' : process.env.MOBILE_HOST
const env = {
  'process.env.NOW_REGION': process.env.NOW_REGION,
  'process.env.NODE_ENV': process.env.NODE_ENV,
  'process.env.GOOGLE_CLIENT_ID': '348227035708-ter7nr3ckok77jn08h1sjtircno59jkj.apps.googleusercontent.com'
}

const babelConfig = require('next-web-config/babel')
module.exports = babelConfig(env)

