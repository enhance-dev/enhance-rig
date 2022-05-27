export default function Paragraph({ html, state }) {
  return html`
  <p>
    <slot></slot>
  </p>
    `
}