class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;

    this.view.on('addElement', this.addElement.bind(this));
    this.view.on('moveElement', this.moveElement.bind(this));

    this.view.on('addRecipe', this.addRecipe.bind(this));
    this.view.on('moveRecipe', this.moveRecipe.bind(this));

    this.view.on('craft', this.craft.bind(this));
    this.view.on('default', this.default.bind(this));
    this.view.on('saveStateToFile', this.saveStateToFile.bind(this));

    this.view.init(this.model.state);
  }

  // element
  addElement({ panel, element: { name, img } }) {
    const element = this.get(panel, name);
    const count = element ? element.count + 1 : 1;

    this.model.add(panel, { name, img, count });
    this.view.init(this.model.state);
  }

  moveElement({ panel, name, target }) {
    const element = this.get(panel, name);
    const targetTrue = ['barn', 'ingredients', 'craft', 'result'];

    if (targetTrue.includes(panel) && targetTrue.includes(target)) {
      this.addElement({ panel: target, element });
      this.remove({ panel, name });
    }
  }

  // recipe
  addRecipe({ panel, element: { name, img, ingredients } }) {
    const ingr = ingredients || this.get('ingredients');
    const element = { name, img, ingredients: ingr };
    this.model.clean('ingredients');

    this.model.add(panel, element);
    this.view.init(this.model.state);
  }

  moveRecipe({ panel, name, target }) {
    const element = this.get(panel, name);
    const targetTrue = ['recipes', 'craftRecipe'];

    if (targetTrue.includes(panel) && targetTrue.includes(target) && panel !== target) {
      this.addRecipe({ panel: target, element });
      this.remove({ panel, name });
    }
  }

  // craft
  craft() {
    const recipe = this.model.get('craftRecipe')[0];
    const recipeIngr = recipe.ingredients;
    const ingredients = this.model.get('craft');

    function compare() {
      let like = true;
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < recipeIngr.length; i++) {
        const findTrue = ingredients.some(
          ingredientElement =>
            ingredientElement.name === recipeIngr[i].name &&
            ingredientElement.count === recipeIngr[i].count
        );
        if (!findTrue) {
          like = findTrue;
          break;
        }
      }
      return like;
    }

    if (recipeIngr.length === ingredients.length && compare()) {
      this.addElement({ panel: 'result', element: { name: recipe.name, img: recipe.img } });
      this.model.clean('craft');
      this.view.init(this.model.state);
    } else {
      alert('Try new combination!');
    }
  }

  // utilits
  get(panel, name) {
    return this.model.get(panel, name);
  }

  remove({ panel, name }) {
    this.model.remove(panel, name);
    this.view.init(this.model.state);
  }

  default() {
    const file = document.querySelector('#defaultBtn').files[0];
    const reader = new FileReader();
    reader.readAsText(file);
    reader.onloadend = () => {
      this.model.default(JSON.parse(reader.result));
      this.view.init(this.model.state);
    };
  }

  saveStateToFile() {
    const a = document.createElement('a');
    a.href = URL.createObjectURL(
      new Blob([JSON.stringify(this.model.saveToFile())], { type: 'text/plain' })
    );
    a.setAttribute('download', 'default.json');
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }
}

export default Controller;
