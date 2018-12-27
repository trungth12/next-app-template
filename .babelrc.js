//const not_now = !process.env.NOW_REGION
//const mobile_host = not_now ? 'm.ihs.edu.vn' : process.env.MOBILE_HOST
const env = {
  'process.env.NOW_REGION': process.env.NOW_REGION,
  'process.env.NODE_ENV': process.env.NODE_ENV,
}

const babelConfig = require('next-web-config/babel')
module.exports = babelConfig(env)

