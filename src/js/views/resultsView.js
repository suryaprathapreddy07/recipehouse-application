import { View } from './view.js';
class ResultsView extends View {
  _parentEl = document.querySelector('.search-results');
  // _form = document.querySelector('.search');
  _ErrorMessage = `No recipes found for your query. Please try again`;
  _message = '';

  _generatemarkup() {
    return `${this._data
      .map(recp => this._generatemarkupPreview(recp))
      .join('')}`;
  }

  _generatemarkupPreview(result) {
    const curId = window.location.hash.slice(1);
    return `<li class="preview">
            <a class="preview__link ${
              result.id === curId ? 'preview__link--active' : ''
            } " href="#${result.id}">
              <figure class="preview__fig">
                <img src="${result.image}" alt="Test" />
              </figure>
              <div class="preview__data">
                <h4 class="preview__title">${result.title}</h4>
                <p class="preview__publisher">${result.publisher}</p>
                
              </div>
            </a>
          </li>`;
  }
}
export default new ResultsView();
