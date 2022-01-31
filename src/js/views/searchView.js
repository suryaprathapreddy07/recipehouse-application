import { View } from './view.js';
class SearchView {
  _parentEl = document.querySelector('.search');

  addHandlerRender(handler) {
    this._parentEl.addEventListener('submit', function (e) {
      e.preventDefault();
      handler();
    });
  }
  clearInput() {
    this._parentEl.querySelector('.search__field').value = '';
  }

  getQuery() {
    const query = this._parentEl.querySelector('.search__field').value;
    this.clearInput();
    return query;
  }
}
export default new SearchView();
