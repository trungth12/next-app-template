const path = process.env.LOCALE_PATH || "./components/sche_ages"
module.exports = {
  "localeDir": `${path}/locales/`,
  "srcPathDirs": [path],
  "format": "po",
  "srcPathIgnorePatterns": [
    "node_modules/", 
    ".next/", 
    "static/",
  ],
}
