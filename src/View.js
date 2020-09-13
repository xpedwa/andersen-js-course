import { EventEmitter } from './EventEmitter';
import { Element } from './Element';
import { dragenter, dragover, dragleave, drop } from './dragNdrop';

class View extends EventEmitter {
  constructor() {
    super();

    this.barnPanel = document.querySelector('#barn');
    this.barnPanel.addEventListener('dragover', dragover);
    this.barnPanel.addEventListener('dragleave', dragleave);
    this.barnPanel.addEventListener('drop', ev => this.moveElement(ev));
    this.barnElements = new Element(this.barnPanel, this.addElementPlus.bind(this));

    this.recipesPanel = document.querySelector('#recipes');
    this.recipesPanel.addEventListener('dragover', dragover);
    this.recipesPanel.addEventListener('dragleave', dragleave);
    this.recipesPanel.addEventListener('drop', ev => this.moveElement(ev));
    this.recipesElements = new Element(this.recipesPanel, this.addElement.bind(this));

    this.craftPanel = document.querySelector('#craft');
    this.craftPanel.addEventListener('dragover', dragover);
    this.craftPanel.addEventListener('dragleave', dragleave);
    this.craftPanel.addEventListener('drop', ev => this.moveElement(ev));
    this.craftElements = new Element(this.craftPanel, this.addElement.bind(this));
  }

  init(state) {
    this.barnPanel.querySelector('.content').innerHTML = '';
    state.barn.forEach(element => {
      this.barnElements.add(element);
    });

    this.recipesPanel.querySelector('.content').innerHTML = '';
    state.recipes.forEach(element => {
      this.recipesElements.add(element);
    });

    this.craftPanel.querySelector('.content').innerHTML = '';
    state.craft.forEach(element => {
      this.craftElements.add(element);
    });
  }

  addElement(panel, element) {
    this.emit('addElement', { panel, element });
  }

  addElementPlus(panel, element) {
    this.emit('addElementPlus', { panel, element });
  }

  moveElement(ev) {
    const { panel, name } = JSON.parse(ev.dataTransfer.getData('obj'));
    const target = ev.target.id;
    this.emit('moveElement', { panel, name, target });
  }
}

export { View };
