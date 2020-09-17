// on element
function dragstart(ev) {
  ev.target.classList.add('drag');
  // console.log(ev);
  const panel = ev.target.parentNode.id;
  const name = ev.target.attributes.name.value;
  ev.dataTransfer.setData('obj', JSON.stringify({ panel, name }));
}

function drag() {
  return undefined;
}

function dragend(ev) {
  ev.target.classList.remove('drag');
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
}

export { dragstart, drag, dragend, dragenter, dragover, dragleave, drop };
