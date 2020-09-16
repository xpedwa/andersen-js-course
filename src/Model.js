import { EventEmitter } from './EventEmitter';

class Model extends EventEmitter {
  constructor(state = {}) {
    super();
    this.state = state;
    this.state.barn = this.state.barn || [];
    this.state.recipes = this.state.recipes || [];
    this.state.ingredients = this.state.ingredients || [];
    this.state.craft = this.state.craft || [];
  }

  addElement(panel, element) {
    const state = this.state[panel];
    const index = state.findIndex(val => val.name === element.name);

    // resolve name
    if (index > -1) {
      state[index] = element;
    } else {
      state.push(element);
    }

    this.state[panel] = state;
    this.emit('change', this.state);
  }

  removeElement(panel, name) {
    const state = this.state[panel];
    const index = state.findIndex(val => val.name === name);

    if (index > -1) {
      const count = state[index].count - 1;
      state[index].count = count;
      if (state[index].count <= 0) {
        state.splice(index, 1);
      }
    }

    this.state[panel] = state;
    this.emit('change', this.state);
  }

  getElement(panel, name) {
    const state = this.state[panel];
    const index = state.findIndex(val => val.name === name);
    return state[index];
  }
}

export { Model };
