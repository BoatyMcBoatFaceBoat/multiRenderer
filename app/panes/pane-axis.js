const Model = require('./model');
require('./pane-axis-element');
class PaneAxis extends Model {
  constructor({ orientation, children, flexScale }) {
    // Always call super first in constructor
    super();
    this.parent = null;
    this.container = null;
    this.orientation = orientation;
    this.flexScale = flexScale != null ? flexScale : 1;

    this.children = [];
  }

  getElement() {
    if (!this.element) {
      this.element = document.createElement('pane-axis-element');
      // this.element = new PaneAxisElement().initialize(this, this.viewRegistry);
    }
    return this.element;
  }

  getFlexScale() {
    return this.flexScale;
  }

  setFlexScale(flexScale) {
    this.flexScale = flexScale;
    this.emitter.emit('did-change-flex-scale', this.flexScale);
    return this.flexScale;
  }

  getParent() {
    return this.parent;
  }

  setParent(parent) {
    this.parent = parent;
    return this.parent;
  }

  getContainer() {
    return this.container;
  }

  setContainer(container) {
    if (container && container !== this.container) {
      this.container = container;
      this.children.forEach(child => child.setContainer(container));
    }
  }

  getOrientation() {
    return this.orientation;
  }

  getChildren() {
    return this.children.slice();
  }

  getPanes() {
    return flatten(this.children.map(child => child.getPanes()));
  }

  getItems() {
    return flatten(this.children.map(child => child.getItems()));
  }

};

// Define the new element
module.exports = customElements.define('pane-axis', PaneAxis,
  { extends: 'div'});
