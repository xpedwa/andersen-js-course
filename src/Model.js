import { EventEmitter } from './EventEmitter';

class Model extends EventEmitter {
  constructor(state = {}) {
    super();
    this.state = state;

    this.state.barn = this.state.barn || [];
    this.state.ingredients = this.state.ingredients || [];
    this.state.craft = this.state.craft || [];
    this.state.result = this.state.result || [];

    this.state.recipes = this.state.recipes || [];
    this.state.craftRecipe = this.state.craftRecipe || [];
  }

  add(panel, element) {
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

  remove(panel, name) {
    const state = this.state[panel];
    const index = state.findIndex(val => val.name === name);

    if (index > -1) {
      const count = state[index].count - 1;
      state[index].count = count;
      if (state[index].count <= 0 || !state[index].count) {
        state.splice(index, 1);
      }
    }

    this.state[panel] = state;
    this.emit('change', this.state);
  }

  get(panel, name = undefined) {
    const state = this.state[panel];
    if (!name) {
      return state;
    }
    const index = state.findIndex(val => val.name === name);
    return state[index];
  }

  clean(panel) {
    this.state[panel] = [];
  }

  default() {
    console.log();
  }
}

export { Model };
