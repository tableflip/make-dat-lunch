/* global DatArchive */
import WebDB from '@beaker/webdb'

export function hasGroup () {
  return !!window.localStorage.getItem('my-dat')
}

export async function initDb () {
  let url = window.localStorage.getItem('my-dat')
  if (!url) {
    const archive = await DatArchive.create({ title: 'make-dat-lunch' })
    url = archive.url
    window.localStorage.setItem('my-dat', url)
  }
  const webdb = new WebDB('make-dat-lunch')
  await webdb.indexArchive(url)
  return webdb
}
