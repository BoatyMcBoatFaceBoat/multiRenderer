const { ipcRenderer } = require('electron');

const PaneAxis = require('./pane-axis');
require('./pane-element');

let nextInstanceId = 1;
let rootPane = null;


class Pane {
  static focus = null;
  constructor(params = {}) {
    this.id = nextInstanceId++;
    this.setParent(params.parent);
    if (!rootPane) {
      rootPane = this;
    }
    focus = this;
  }
  getElement() {
    if (!this.element) {
      // console.log(paneElement);
      this.element = document.createElement('pane-element');
      this.element.addEventListener('click', event => {
        if (event.ctrlKey) {
          this.splitDown()
        } else {
          this.splitRight()
        }
      });
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
  splitLeft(params) {
    return this.split('horizontal', 'before', params);
  }
  splitRight(params) {
    return this.split('horizontal', 'after', params);
  }
  splitUp(params) {
    return this.split('vertical', 'before', params);
  }
  splitDown(params) {
    return this.split('vertical', 'after', params);
  }

  // we insert a pane-axis unless there is one and the split is similarly oriented as the present axis
  // if we do, we move the current pane into it.
  split(orientation, side, params) {
    const newPane = new Pane(params);
    const p = document.createElement('p');
    p.innerHTML = `newly created pane with id ${newPane.id}`;
    newPane.getElement().appendChild(p);

    if (typeof this.parent !== 'pane-axis' || this.parent.orientation !== orientation) {
      const newAxis = new PaneAxis({orientation});
      // make current pane daughter of this
      const parent = this.parent;
      let kids = parent.childNodes;
      let kid;
      while (kid = parent.firstChild) {
        parent.removeChild(parent.firstChild);
        newAxis.getElement().appendChild(kid);
      }
      parent.appendChild(newAxis.getElement());
      newAxis.getElement().appendChild(newPane.getElement());
    } else if(typeof this.parent == 'pane-axis') {
      newAxis.getElement().appendChild(newPane.getElement());
    }
    // newPane.activate();
    return newPane;
  }

  static dumpTree() {
    if (rootPane) {
      rootPane.dump(0);
    } else {
      console.log('no rootPane identified');
    }

  }
  dump(indent) {
    const pref = ' '.repeat(indent);
    console.log(pref + 'pane ' + this.id);
    if (this.container) {
      this.container.dump(indent + 1);
    } else {
      console.log(pref + ' *');
    }
  }
}


ipcRenderer.on('dump-concept-tree', (event, arg) => {
  Pane.dumpTree();
});

module.exports = Pane
