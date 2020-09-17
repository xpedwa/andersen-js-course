import { dragstart, dragend } from './dragNdrop';

class Element {
  constructor(panel, callback) {
    this.panel = panel;
    this.form = document.querySelector(`#form_${panel.id}`) || undefined;

    if (this.form)
      this.form.addEventListener('submit', e => {
        e.preventDefault();
        this.create(callback);
      });
  }

  create(callback) {
    const name = this.form.elements.name.value;
    const imgFile = this.form.elements.img.files[0];
    if (!imgFile) alert('image not selected');
    else {
      const blob = new Blob([imgFile], { type: imgFile.type });
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onloadend = () => {
        const img = reader.result;
        callback(this.panel.id, { name, img });
      };
    }
  }

  add({ name, img, count }) {
    this.element = document.createElement('div');
    this.element.setAttribute('class', 'item');
    this.element.setAttribute('style', `background-image: url(${img})`);
    this.element.appendChild(document.createTextNode(count || ''));
    this.element.setAttribute('name', name);
    this.element.setAttribute('title', name);
    this.element.setAttribute('draggable', 'true');
    this.element.addEventListener('dragstart', dragstart);
    this.element.addEventListener('dragend', dragend);

    this.panel.appendChild(this.element);
  }
}

export { Element };
