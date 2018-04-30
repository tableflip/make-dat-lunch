const WebDB = require('@beaker/webdb')

async function initDb () {
  let url = localStorage.getItem('my-dat')
  if (!url) {
    const archive = await DatArchive.create({
      title:'make-dat-lunch'
    })
    url = archive.url
    localStorage.setItem('my-dat', url)
  }
  const webdb = new WebDB('make-dat-lunch')
  await webdb.indexArchive(url)
  return webdb
}

initDb().then(webdb => {
  window.webdb = webdb
})
