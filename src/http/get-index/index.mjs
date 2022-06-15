import arc from '@architect/functions'
import enhance from '@enhance/ssr'
import elements from '@architect/views/elements/elements.mjs'
import Head from '@architect/views/elements/head.mjs'

const html = enhance({
  elements,
  scriptTransforms: [
    importTransform({ lookup: arc.static }),
  ]
})

function importTransform({ lookup }) {
  return function transform({ raw }) {
    const importRegex = new RegExp(
      /(import(?:["'\s]*([\w*${}\n\r\t, ]+)from\s*)?["'\s]["'\s])(\/_static\/.*[@\w_-]+)(["'\s].*;?$)/,
      'gm'
    )
    let str = raw.replace(
      importRegex,
      (str, before, importName, location, after) => {
        return `${before}${lookup(location.split('/').pop())}${after}`
      }
    )
    str = str.replace(/__WORKER_SCRIPT_URL__/g, lookup('worker.mjs'))
    return str
  }
}

export const handler = arc.http.async(myhandler)
async function myhandler() {
  return {
    statusCode: 200,
    headers: {
      'content-type': 'text/html; charset=utf8'
    },
    body: html`
${Head()}
<hello-world></hello-world>

<hello-world name="Salmon">
  <h1 slot='salutation'>wow</h1>
</hello-world>

<hello-world name="Tyler">
  <h1 slot='salutation'>My name is Taylor, Salmon</h1>
</hello-world>
    `
  }
}