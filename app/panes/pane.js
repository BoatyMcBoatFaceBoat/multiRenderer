const PaneAxis = require('./pane-axis');
require('./pane-element');

let nextInstanceId = 1;

module.exports = class Pane {
  constructor(params = {}) {
    this.id = nextInstanceId++;
  }
  getElement() {
    if (!this.element) {
      // console.log(paneElement);
      this.element = document.createElement('pane-element');
    }
    return this.element;
  }

  getParent() {
    return this.parent;
  }

  setParent(parent) {
    this.parent = parent;
  }

  getContainer() {
    return this.container;
  }

  setContainer(container) {
    if (container && container !== this.container) {
      this.container = container;
      container.didAddPane({ pane: this });
    }
  }

  // Private: Determine whether the given item is allowed to exist in this pane.
  //
  // * `item` the Item
  //
  // Returns a {Boolean}.
  isItemAllowed(item) {
    if (typeof item.getAllowedLocations !== 'function') {
      return true;
    } else {
      return item
        .getAllowedLocations()
        .includes(this.getContainer().getLocation());
    }
  }

  setFlexScale(flexScale) {
    this.flexScale = flexScale;
    this.emitter.emit('did-change-flex-scale', this.flexScale);
    return this.flexScale;
  }

  getFlexScale() {
    return this.flexScale;
  }

  increaseSize() {
    if (this.getContainer().getPanes().length > 1) {
      this.setFlexScale(this.getFlexScale() * 1.1);
    }
  }

  decreaseSize() {
    if (this.getContainer().getPanes().length > 1) {
      this.setFlexScale(this.getFlexScale() / 1.1);
    }
  }
};
