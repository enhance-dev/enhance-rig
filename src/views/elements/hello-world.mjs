export default function HelloWorld({ html, state }) {
  const { attrs, store } = state
  const { name='World' } = attrs
  return html`
<style scope="global">
  body {
    font-family: sans-serif;
  }
</style>
<slot is="div" name="salutation">
  <h1>
    Hello
  </h1>
</slot>
<span observed="name">${name}</span>


<script type="module">
  import BaseElement from '/_bundles/base-element.mjs'

  class HelloWorld extends BaseElement {
    constructor() {
      super()
      console.log('HelloWorld constructor')
    }

    static get observedAttributes() {
      return [
        'name',
      ]
    }

    attributeChangedCallback(name, oldValue, newValue) {
      if (oldValue !== newValue) {

      }
    }
  }

  customElements.define('hello-world', HelloWorld)
</script>
  `
}