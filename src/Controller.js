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

    if (recipeIngr.length === ingredients.length) {
      console.log('length OK');

      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < recipeIngr.length; i++) {
        const compare = ingredients.some(
          ingredientElement =>
            ingredientElement.name === recipeIngr[i].name &&
            ingredientElement.count === recipeIngr[i].count
        );

        console.log(compare);
        if (!compare) {
          alert('not like');
          break;
        }
      }
      this.addElement({ panel: 'result', element: { name: recipe.name, img: recipe.img } });
    } else {
      alert('not like');
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
    console.log('default');
  }
}

export default Controller;
