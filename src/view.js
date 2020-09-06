import { EventEmitter } from './EventEmitter';
import { allowDrop, drag, drop } from './dragNdrop';

class Items extends EventEmitter {
  addEventListenerToForm(form, cb) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const name = e.target.elements.name.value;
      const imgFile = e.target.elements.img.files[0];
      if (!imgFile) alert('image not selected');
      else {
        const blob = new Blob([imgFile], { type: imgFile.type });
        const reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onloadend = () => {
          const img = reader.result;
          cb({ name, img });
        };
      }
    });
    console.log(this);
  }

  show(state) {
    this.panel.innerHTML = '';
    state.forEach(element => {
      this.addItemToPanel(element);
    });
  }

  addItemToPanel({ name, img, count }) {
    this.element = document.createElement('div');
    this.element.setAttribute('class', 'item');
    this.element.setAttribute('style', `background-image: url(${img})`);
    this.element.appendChild(document.createTextNode(count || ''));
    this.element.setAttribute('name', name);
    this.element.setAttribute('id', name);
    this.element.setAttribute('draggable', 'true');
    this.element.setAttribute('ondragstart', drag);
    this.element.addEventListener('click', e => this.handleRemItem(e));
    // this.element.addEventListener('ondragstart', e => this.drag(e));

    this.panel.appendChild(this.element);
  }
}

class Barn extends Items {
  constructor() {
    super();
    this.panel = document.querySelector('#barn .content');
    this.panel.setAttribute('ondragover', allowDrop);
    this.panel.setAttribute('ondrop', drop);
    this.form = document.querySelector('#addItemToBarnForm');
    this.addEventListenerToForm(this.form, this.handleNewItem.bind(this));
  }

  // handlers:
  handleNewItem({ name, img }) {
    this.emit('addItemToBarn', { name, img });
    return false;
  }

  handleRemItem(e) {
    const name = e.target.attributes.name.value;
    this.emit('remItemFromBarn', name);
  }
}

class Recipes extends Items {
  constructor() {
    super();
    this.panel = document.querySelector('#recipes .content');
    this.panel.setAttribute('ondragover', allowDrop);
    this.panel.setAttribute('ondrop', drop);
    this.form = document.querySelector('#addItemToRecipesForm');
    this.addEventListenerToForm(this.form, this.handleNewItem.bind(this));
  }

  // handlers:
  handleNewItem({ name, img }) {
    this.emit('addItemToRecipes', { name, img });
    return false;
  }
}

export { Barn, Recipes };
