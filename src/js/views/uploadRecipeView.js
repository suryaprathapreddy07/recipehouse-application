import { View } from './view.js';

class uploadRecipe extends View {
  _parentEl = document.querySelector('.upload');
  overlay = document.querySelector('.overlay');
  recipeWindow = document.querySelector('.add-recipe-window');
  btnAddRecipe = document.querySelector('.nav__btn--add-recipe');
  btnCloseRecipe = document.querySelector('.btn--close-modal');
  btnUpload = document.querySelector('.upload__btn');

  constructor() {
    super();
    this.addHandlerAddRecipe();
    this.addHandlerCloseRecipe();
  }
  toggleWindow() {
    this.overlay.classList.toggle('hidden');
    this.recipeWindow.classList.toggle('hidden');
  }

  addHandlerAddRecipe() {
    this.btnAddRecipe.addEventListener('click', this.toggleWindow.bind(this));
  }
  addHandlerCloseRecipe() {
    this.btnCloseRecipe.addEventListener('click', this.toggleWindow.bind(this));
    this.overlay.addEventListener('click', this.toggleWindow.bind(this));
    window.addEventListener('keydown', e =>
      e.key == `Escape` ? this.toggleWindow() : ''
    );
  }

  addHandlerUploadRecipe(handler) {
    this._parentEl.addEventListener('submit', function (e) {
      e.preventDefault();
      const dataArr = [...new FormData(this)];
      const data = Object.fromEntries(dataArr);
      handler(data);
    });
  }
}

export default new uploadRecipe();
