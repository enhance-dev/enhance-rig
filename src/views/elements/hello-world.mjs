export default function HelloWorld({ html, state }) {
  const { attrs, store } = state
  const { name='World' } = attrs
  return html`
<style scope="global">
  body {
    font-family: sans-serif;
  }
</style>
<slot as="div" name="salutation">
  <h1>
    Hello
  </h1>
</slot>
<span>${name}</span>


<script type="module">
  import BaseElement from '/_static/bundles/base-element.mjs'

  class HelloWorld extends BaseElement {
    constructor() {
      super()
      this.updateName = this.updateName.bind(this)
      console.log('HelloWorld constructor')
    }

    static get observedAttributes() {
      return [
        'name',
      ]
    }

    updateName(name) {
      this.shadowRoot.querySelector('span').textContent = name
    }

    attributeChangedCallback(name, oldValue, newValue) {
      if (oldValue !== newValue) {
        this.updateName(newValue)
      }
    }

  }

  customElements.define('hello-world', HelloWorld)
</script>
  `
}