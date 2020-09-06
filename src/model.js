import { EventEmitter } from './EventEmitter';

class Model extends EventEmitter {
  constructor(state = {}) {
    super();
    this.state = state;
    this.state.barn = this.state.barn || [];
    this.state.recipes = this.state.recipes || [];
  }

  addBarnItemToState(item) {
    const index = this.state.barn.findIndex(val => val.name === item.name);

    if (index >= 0) {
      const count = this.state.barn[index].count + 1;
      this.state.barn[index] = item;
      this.state.barn[index].count = count;
    } else {
      this.state.barn.push(item);
    }
    console.log(this.state);
    this.emit('change', this.state);
  }

  remBarnItemFromState(name) {
    const index = this.state.barn.findIndex(val => val.name === name);

    if (index >= 0) {
      this.state.barn[index].count = this.state.barn[index].count - 1;
      if (this.state.barn[index].count <= 0) {
        this.state.barn.splice(index, 1);
      }
    }

    this.emit('change', this.state);
    return this.state.barn;
  }

  addRecipesItemToState(item) {
    this.state.recipes.push(item);
    console.log('model');
    this.emit('change', this.state);
  }
}

export { Model };
