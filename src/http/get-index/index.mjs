import arc from '@architect/functions'
import enhance from '@enhance/ssr'
import elements from '@architect/views/elements/elements.mjs'
import Head from '@architect/views/elements/head.mjs'
import importTransform from '@enhance/import-transform'

const html = enhance({
  elements,
  scriptTransforms: [
    importTransform({ lookup: arc.static }),
  ]
})

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