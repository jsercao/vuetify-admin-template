export function parseURL(ourl) {
  if (!ourl) {
    return {}
  }

  const url = ourl.toString()
  const a = document.createElement('a')
  a.href = url
  const ret = {
    source: url,
    protocol: a.protocol.replace(':', ''),
    host: a.hostname,
    origin: a.origin,
    port: a.port,
    query: a.search,
    path: a.pathname.replace(/^([^\/])/, '/$1'),
    params: (function() {
      const ret = {}
      const seg = a.search.replace(/^\?/, '').split('&').filter(function(v, i) {
        if (v !== '' && v.indexOf('=')) {
          return true
        }
      })
      seg.forEach(function(element, index) {
        const idx = element.indexOf('=')
        const key = element.substring(0, idx)
        const val = element.substring(idx + 1)
        ret[key] = val
      })
      return ret
    })()
  }
  if (ret.origin && !/\/$/.test(ret.origin)) ret.origin += '/'
  return ret
}
