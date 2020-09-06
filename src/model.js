import { EventEmitter } from './EventEmitter';

class Model extends EventEmitter {
  constructor(state = []) {
    super();
    this.state = state;
  }

  addItemToState(item) {
    const index = this.state.findIndex(val => val.name === item.name);

    if (index >= 0) {
      const count = this.state[index].count + 1;
      this.state[index] = item;
      this.state[index].count = count;
    } else {
      this.state.push(item);
    }

    this.emit('change', this.state);
  }

  remItemFromState(name) {
    const index = this.state.findIndex(val => val.name === name);

    if (index >= 0) {
      this.state[index].count = this.state[index].count - 1;
      if (this.state[index].count <= 0) {
        this.state.splice(index, 1);
      }
    }
    this.emit('change', this.state);
    return this.state;
  }
}

export { Model };
