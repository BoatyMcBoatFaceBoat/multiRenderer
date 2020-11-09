class PaneElement extends HTMLElement {
  constructor() {
    // Always call super first in constructor
    super();

    // Create a shadow root
    this.shadow = this.attachShadow({mode: 'open'});
    const wrapper = document.createElement('div');
    wrapper.setAttribute('class', 'wrapper');

    const style = document.createElement('style');
    console.log(style.isConnected);

    style.textContent = `
    .wrapper {
      .wrapper {
        position: relative;
      }

      .info {
        font-size: 0.8rem;
        width: 200px;
        display: inline-block;
        border: 1px solid black;
        padding: 10px;
        background: red;
        border-radius: 10px;
        opacity: 0;
        transition: 0.6s all;
        position: absolute;
        bottom: 20px;
        left: 10px;
        z-index: 3;
      }

      img {
        width: 1.2rem;
      }

      .icon:hover + .info, .icon:focus + .info {
        opacity: 1;
      }
    `;

    // Attach the created elements to the shadow dom
    this.shadow.appendChild(style);
    this.shadow.appendChild(wrapper);

    // Create spans
    // Attach the created elements to the shadow dom
  }
  // createButtonChild(buttonText) {
  //   let buttonChild = document.createElement('button');
  //   buttonChild.innerHTML = buttonText;
  //   this.appendChild(buttonChild);
  // }
  // createPChild(pText) {
  //   let pChild = document.createElement('p');
  //   pChild.innerHTML = pText
  //   this.appendChild(pChild);
  // }
};

// Define the new element
module.exports = customElements.define('pane-element', Panelement,
  { extends: 'div'});
