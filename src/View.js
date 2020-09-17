import { EventEmitter } from './EventEmitter';
import { Element } from './Element';
import { dragover, dragleave } from './dragNdrop';

class View extends EventEmitter {
  constructor() {
    super();

    // Elements
    this.barnPanel = document.querySelector('#barn');
    this.barnPanel.addEventListener('dragover', dragover);
    this.barnPanel.addEventListener('dragleave', dragleave);
    this.barnPanel.addEventListener('drop', ev => this.moveElement(ev));
    this.barnElements = new Element(this.barnPanel, this.addElement.bind(this));

    this.ingredientsPanel = document.querySelector('#ingredients');
    this.ingredientsPanel.addEventListener('dragover', dragover);
    this.ingredientsPanel.addEventListener('dragleave', dragleave);
    this.ingredientsPanel.addEventListener('drop', ev => this.moveElement(ev));
    this.ingredientElement = new Element(this.ingredientsPanel, this.addElement.bind(this));

    this.craftPanel = document.querySelector('#craft');
    this.craftPanel.addEventListener('dragover', dragover);
    this.craftPanel.addEventListener('dragleave', dragleave);
    this.craftPanel.addEventListener('drop', ev => this.moveElement(ev));
    this.craftElements = new Element(this.craftPanel, this.addElement.bind(this));

    this.resultPanel = document.querySelector('#result');
    this.resultPanel.addEventListener('dragover', dragover);
    this.resultPanel.addEventListener('dragleave', dragleave);
    this.resultPanel.addEventListener('drop', ev => this.moveElement(ev));
    this.resultElements = new Element(this.resultPanel, this.addElement.bind(this));

    // Recipes
    this.recipesPanel = document.querySelector('#recipes');
    this.recipesPanel.addEventListener('dragover', dragover);
    this.recipesPanel.addEventListener('dragleave', dragleave);
    this.recipesPanel.addEventListener('drop', ev => this.moveRecipe(ev));
    this.recipesElements = new Element(this.recipesPanel, this.addRecipe.bind(this));

    this.recipePlacePanel = document.querySelector('#craftRecipe');
    this.recipePlacePanel.addEventListener('dragover', dragover);
    this.recipePlacePanel.addEventListener('dragleave', dragleave);
    this.recipePlacePanel.addEventListener('drop', ev => this.moveRecipe(ev));
    this.recipePlaceElements = new Element(this.recipePlacePanel, this.addRecipe.bind(this));

    // button
    const craftBtn = document.querySelector('#craftBtn');
    craftBtn.addEventListener('click', this.craft.bind(this));

    const defaultBtn = document.querySelector('#defaultBtn');
    defaultBtn.addEventListener('click', this.default.bind(this));
  }

  init(state) {
    // Elements
    this.barnPanel.innerHTML = '';
    state.barn.forEach(element => {
      this.barnElements.add(element);
    });

    this.ingredientsPanel.innerHTML = '';
    state.ingredients.forEach(element => {
      this.ingredientElement.add(element);
    });

    this.craftPanel.innerHTML = '';
    state.craft.forEach(element => {
      this.craftElements.add(element);
    });

    this.resultPanel.innerHTML = '';
    state.result.forEach(element => {
      this.resultElements.add(element);
    });

    // Recipes
    this.recipesPanel.innerHTML = '';
    state.recipes.forEach(element => {
      this.recipesElements.add(element);
    });

    this.recipePlacePanel.innerHTML = '';
    state.craftRecipe.forEach(element => {
      this.recipePlaceElements.add(element);
    });
  }

  // Elements
  addElement(panel, element) {
    this.emit('addElement', { panel, element });
  }

  moveElement(ev) {
    ev.preventDefault();
    ev.target.classList.remove('dragOver');

    const { panel, name } = JSON.parse(ev.dataTransfer.getData('obj'));
    const target = ev.target.id;
    this.emit('moveElement', { panel, name, target });
  }

  // Recipes
  addRecipe(panel, element) {
    this.emit('addRecipe', { panel, element });
  }

  moveRecipe(ev) {
    ev.preventDefault();
    ev.target.classList.remove('dragOver');

    const { panel, name } = JSON.parse(ev.dataTransfer.getData('obj'));
    const target = ev.target.id;
    this.emit('moveRecipe', { panel, name, target });
  }

  // Buttons
  craft() {
    this.emit('craft');
  }

  default() {
    this.emit('default');
  }
}

export { View };
