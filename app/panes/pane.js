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
  /*
  Section: Splitting
  */

  // Public: Create a new pane to the left of this pane.
  //
  // * `params` (optional) {Object} with the following keys:
  //   * `items` (optional) {Array} of items to add to the new pane.
  //   * `copyActiveItem` (optional) {Boolean} true will copy the active item into the new split pane
  //
  // Returns the new {Pane}.
  splitLeft(params) {
    return this.split('horizontal', 'before', params);
  }

  // Public: Create a new pane to the right of this pane.
  //
  // * `params` (optional) {Object} with the following keys:
  //   * `items` (optional) {Array} of items to add to the new pane.
  //   * `copyActiveItem` (optional) {Boolean} true will copy the active item into the new split pane
  //
  // Returns the new {Pane}.
  splitRight(params) {
    return this.split('horizontal', 'after', params);
  }

  // Public: Creates a new pane above the receiver.
  //
  // * `params` (optional) {Object} with the following keys:
  //   * `items` (optional) {Array} of items to add to the new pane.
  //   * `copyActiveItem` (optional) {Boolean} true will copy the active item into the new split pane
  //
  // Returns the new {Pane}.
  splitUp(params) {
    return this.split('vertical', 'before', params);
  }

  // Public: Creates a new pane below the receiver.
  //
  // * `params` (optional) {Object} with the following keys:
  //   * `items` (optional) {Array} of items to add to the new pane.
  //   * `copyActiveItem` (optional) {Boolean} true will copy the active item into the new split pane
  //
  // Returns the new {Pane}.
  splitDown(params) {
    return this.split('vertical', 'after', params);
  }

  split(orientation, side, params) {
    if (params && params.copyActiveItem) {
      if (!params.items) params.items = [];
      params.items.push(this.copyActiveItem());
    }

    if (this.parent.orientation !== orientation) {
      this.parent.replaceChild(
        this,
        new PaneAxis(
          {
            container: this.container,
            orientation,
            children: [this],
            flexScale: this.flexScale
          },
          this.viewRegistry
        )
      );
      this.setFlexScale(1);
    }

    const newPane = new Pane(
      Object.assign(
        {
          applicationDelegate: this.applicationDelegate,
          notificationManager: this.notificationManager,
          deserializerManager: this.deserializerManager,
          config: this.config,
          viewRegistry: this.viewRegistry
        },
        params
      )
    );

    switch (side) {
      case 'before':
        this.parent.insertChildBefore(this, newPane);
        break;
      case 'after':
        this.parent.insertChildAfter(this, newPane);
        break;
    }

    if (params && params.moveActiveItem && this.activeItem)
      this.moveItemToPane(this.activeItem, newPane);

    newPane.activate();
    return newPane;
  }

};
