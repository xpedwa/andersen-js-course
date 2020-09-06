class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;

    this.view.on('addItemToBarn', this.addItemToBarn.bind(this));
    this.view.on('remItemFromBarn', this.remItemFromBarn.bind(this));

    this.view.show(this.model.state);
  }

  addItemToBarn({ name, img }) {
    this.model.addItemToState({
      name,
      img,
      count: 1,
    });

    this.view.show(this.model.state);
  }

  remItemFromBarn(element) {
    const newState = this.model.remItemFromState(element);

    this.view.show(newState);
  }
}

export default Controller;
