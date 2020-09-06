import { EventEmitter } from './EventEmitter';

class Barn extends EventEmitter {
  constructor() {
    super();
    this.panel = document.querySelector('#barn .content');
    this.form = document.querySelector('#addItemToBarnForm');
    this.form.addEventListener('submit', e => {
      e.preventDefault();
      const name = e.target.elements.name.value;
      const imgFile = e.target.elements.img.files[0];

      const blob = new Blob([imgFile], { type: imgFile.type });
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onloadend = () => {
        const img = reader.result;
        this.handleNewItem({ name, img });
      };
    });
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

  // manipulators:
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
    this.element.appendChild(document.createTextNode(count));
    this.element.setAttribute('name', name);
    this.element.addEventListener('click', e => this.handleRemItem(e));

    this.panel.appendChild(this.element);
  }
}

export { Barn };
