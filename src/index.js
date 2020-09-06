import './styles/main.css';
import { Barn, Recipes } from './view';
import Controller from './controller';
import { Model } from './model';

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

const barnView = new Barn();
const recipesView = new Recipes();
const controller = new Controller(model, barnView, recipesView);
