import './styles/main.css';
import { View } from './View';
import Controller from './Controller';
import { Model } from './Model';

function loadState() {
  const string = localStorage.getItem('app');
  const data = JSON.parse(string) || {};

  return data;
}

function saveState(data) {
  const string = JSON.stringify(data);
  localStorage.setItem('app', string);
}

const model = new Model(loadState());
model.on('change', saveState);

const view = new View();
const controller = new Controller(model, view);
