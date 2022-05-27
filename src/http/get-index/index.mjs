import arc from '@architect/functions'
import enhance from '@enhance/ssr'
import elements from '@architect/views/elements/elements.mjs'
import importTransform from '@enhance/import-transform'
import map from '@architect/views/_bundles/map.mjs'
import Head from '@architect/views/elements/head.mjs'
const html = enhance({
  elements,
  scriptTransforms: [
    importTransform({ map })
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

<hello-world name="Ya'll">
  <h1 slot='salutation'>wow</h1>
</hello-world>
    `
  }
}