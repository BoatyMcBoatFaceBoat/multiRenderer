let nextInstanceId = 1;

module.exports =  class Model {
  resetNextInstanceId() {
    nextInstanceId = 1;
  }

  constructor(params) {
    this.assignId(params ? params.id : null);
    this.alive = true;
  }

  assignId(id) {
    this.id = this.id || id || nextInstanceId++;
    if (id >= nextInstanceId) {
      nextInstanceId = id + 1;
    }
  }

  destroy() {
    return unless(this.isAlive());
    this.alive = false;
  }

  isAlive() { return this.alive }
  isDestroyed() { return not(this.isAlive()) }
}
