// on element
function dragstart(ev) {
  ev.target.classList.add('drag');
  const panel = ev.target.parentNode.id;
  const name = ev.target.attributes.name.value;
  ev.dataTransfer.setData('obj', JSON.stringify({ panel, name }));
}

function dragend(ev) {
  ev.target.classList.remove('drag');
}

// on place
function dragover(ev) {
  ev.preventDefault();
  ev.target.classList.add('dragOver');
}

function dragleave(ev) {
  ev.preventDefault();
  ev.target.classList.remove('dragOver');
}

export { dragstart, dragend, dragover, dragleave };
