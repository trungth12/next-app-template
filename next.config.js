const withOffline = moduleExists('next-offline')
? require('next-offline')
: {};
const withCSS = moduleExists("@zeit/next-css") 
  ? require("@zeit/next-css") 
  : {};

const withLess = moduleExists("@zeit/next-less") 
  ? require("@zeit/next-less") 
  : {};

const withStyledIcons = moduleExists('next-plugin-styled-icons')
  ? require('next-plugin-styled-icons')
  : {};

// fix: prevents error when .css files are required by node
if (typeof require !== 'undefined') {
  // eslint-disable-next-line
  require.extensions['.css'] = (file) => {}
  require.extensions['.less'] = (file) => {}
}
const config = {
  lessLoaderOptions: {
    javascriptEnabled: true,
    modifyVars: {
      primaryColor: '#22292f'
    }
  }
}
const nextConfig = moduleExists('next-web-config/next')
  ? require('next-web-config/next')(config)
  : {};

function moduleExists(name) {
  try {
    return require.resolve(name);
  } catch (error) {
    return false;
  }
}

module.exports = moduleExists('next-offline') 
&& moduleExists('@zeit/next-css') 
&& moduleExists('@zeit/next-less')
&& moduleExists('next-plugin-styled-icons')
? withCSS(withLess(withStyledIcons(withOffline(nextConfig))))
: nextConfig