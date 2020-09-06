class Controller {
  constructor(model, barnView, recipesView) {
    this.model = model;
    this.barnView = barnView;
    this.recipesView = recipesView;

    this.barnView.on('addItemToBarn', this.addItemToBarn.bind(this));
    this.barnView.on('remItemFromBarn', this.remItemFromBarn.bind(this));

    this.recipesView.on('addItemToRecipes', this.addItemToRecipes.bind(this));

    this.barnView.show(this.model.state.barn);
    this.recipesView.show(this.model.state.recipes);
  }

  addItemToBarn({ name, img }) {
    this.model.addBarnItemToState({
      name,
      img,
      count: 1,
    });

    this.barnView.show(this.model.state.barn);
  }

  remItemFromBarn(element) {
    const newState = this.model.remBarnItemFromState(element);

    this.barnView.show(newState);
  }

  addItemToRecipes({ name, img }) {
    console.log('contr');
    this.model.addRecipesItemToState({
      name,
      img,
      ingredients: [],
    });
    this.recipesView.show(this.model.state.recipes);
  }
}

export default Controller;
