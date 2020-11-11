const Model = require('./model');
require('./pane-axis-element');
module.exports = class PaneAxis extends Model {
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
      this.element.setAttribute('class', this.orientation);
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

  addChild(child, index = this.children.length) {
    this.children.splice(index, 0, child);
    child.setParent(this);
    child.setContainer(this.container);
    // this.subscribeToChild(child);
    // return this.emitter.emit('did-add-child', { child, index });
  }

  adjustFlexScale() {
    // get current total flex scale of children
    let total = 0;
    for (var child of this.children) {
      total += child.getFlexScale();
    }

    const needTotal = this.children.length;
    // set every child's flex scale by the ratio
    for (child of this.children) {
      child.setFlexScale((needTotal * child.getFlexScale()) / total);
    }
  }

  removeChild(child, replacing = false) {
    const index = this.children.indexOf(child);
    if (index === -1) {
      throw new Error('Removing non-existent child');
    }

    // this.unsubscribeFromChild(child);

    this.children.splice(index, 1);
    this.adjustFlexScale();
    // this.emitter.emit('did-remove-child', { child, index });
    if (!replacing && this.children.length < 2) {
      this.reparentLastChild();
    }
  }

  replaceChild(oldChild, newChild) {
    // this.unsubscribeFromChild(oldChild);
    // this.subscribeToChild(newChild);

    newChild.setParent(this);
    newChild.setContainer(this.container);

    const index = this.children.indexOf(oldChild);
    this.children.splice(index, 1, newChild);
    // this.emitter.emit('did-replace-child', { oldChild, newChild, index });
  }

  insertChildBefore(currentChild, newChild) {
    const index = this.children.indexOf(currentChild);
    return this.addChild(newChild, index);
  }

  insertChildAfter(currentChild, newChild) {
    const index = this.children.indexOf(currentChild);
    return this.addChild(newChild, index + 1);
  }

  reparentLastChild() {
    const lastChild = this.children[0];
    lastChild.setFlexScale(this.flexScale);
    this.parent.replaceChild(this, lastChild);
    this.destroy();
  }
  dump(indent) {
    const pref = ' '.repeat(indent);
    console.log(pref + 'axis');
    let kids = this.getChildren();
    kids.forEach(v => v.dump(indent + 1));
  }

};

// // Define the new element
// module.exports = customElements.define('pane-axis', PaneAxis,
//   { extends: 'div'});
