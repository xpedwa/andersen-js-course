// on element
function dragstart(ev) {
  ev.target.classList.add('drag');
  const panel = ev.target.parentNode.parentNode.id;
  const name = ev.target.attributes.name.value;
  ev.dataTransfer.setData('obj', JSON.stringify({ panel, name }));
  // const item = ev.target;
  // const img = item.atributes.style.substr(22, ev.target.atributes.style.length - 1);
  // ev.dataTransfer.setData('item', img);
}

function drag(ev) {
  return undefined;
}

function dragend(ev) {
  ev.target.classList.remove('drag');
  // ev.dataTransfer.clearData();
  console.log(ev);
}

// on place

const craft = document.querySelector('#craft');

function dragenter(ev) {
  ev.preventDefault();
}

function dragover(ev) {
  ev.preventDefault();
  ev.target.classList.add('dragOver');
}

function dragleave(ev) {
  ev.preventDefault();
  ev.target.classList.remove('dragOver');
}

function drop(ev) {
  ev.preventDefault();
  ev.target.classList.remove('dragOver');

  if (ev.target === craft) alert('yes');
  // console.log(ev);
  // this.emit('addItemToCraft', {});
  // const isMoveable = flyOn !== craft;
  // if (!isMoveable) {
  // return;
  // }

  // if (flyOn === craft) alert('craft');
}

export { dragstart, drag, dragend, dragenter, dragover, dragleave, drop };
