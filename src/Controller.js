class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;

    this.view.on('addElement', this.addElement.bind(this));
    this.view.on('addElementPlus', this.addElementPlus.bind(this));
    this.view.on('moveElement', this.moveElement.bind(this));

    this.view.init(this.model.state);
  }

  // view handlers
  addElement({ panel, element }) {
    this.model.addElement(panel, element);
    this.view.init(this.model.state);
  }

  addElementPlus({ panel, element: { name, img } }) {
    const element = this.getElement(panel, name);
    const count = element ? element.count + 1 : 1;
    this.model.addElement(panel, { name, img, count });
    this.view.init(this.model.state);
  }

  removeElement({ panel, name }) {
    this.model.removeElement(panel, name);
    this.view.init(this.model.state);
  }

  moveElement({ panel, name, target }) {
    const element = this.getElement(panel, name);

    if (element.count) this.addElementPlus({ panel: target, element });
    else this.addElement({ panel: target, element });

    this.removeElement({ panel, name });
  }

  // utilits
  getElement(panel, name) {
    return this.model.getElement(panel, name);
  }
}

export default Controller;
