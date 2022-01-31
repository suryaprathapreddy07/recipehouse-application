import icons from 'url:../../img/icons.svg';
import { View } from './view.js';

class paginationView extends View {
  _parentEl = document.querySelector('.pagination');

  _addHandlerPagination(handler) {
    this._parentEl.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;
      const goToPage = +btn.dataset.goto;
      // console.log(goToPage);

      handler(goToPage);
    });
  }
  _generatemarkup() {
    const curPage = this._data.page;
    // console.log(curPage);
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );
    // console.log(`numpages${numPages}`);

    if (curPage === 1 && numPages > 1)
      return `
                <button data-goto='${
                  curPage + 1
                }' class="btn--inline pagination__btn--next">
                  <span>Page ${curPage + 1}</span>
                  <svg class="search__icon">
                    <use href="${icons}#icon-arrow-right"></use>
                  </svg>
                </button>`;

    if (curPage === numPages && numPages > 1)
      return `
                <button data-goto='${
                  curPage - 1
                }' class="btn--inline pagination__btn--prev">
                  <svg class="search__icon">
                    <use href="${icons}#icon-arrow-left"></use>
                  </svg>
                  <span>Page ${curPage - 1}</span>
                </button>`;

    if (curPage < numPages)
      return `
                 <button data-goto='${
                   curPage + 1
                 }' class="btn--inline pagination__btn--next">
                  <span>Page ${curPage + 1}</span>
                  <svg class="search__icon">
                    <use href="${icons}#icon-arrow-right"></use>
                  </svg>
                </button>
                 <button data-goto='${
                   curPage - 1
                 }' class="btn--inline pagination__btn--prev">
                  <svg class="search__icon">
                    <use href="${icons}#icon-arrow-left"></use>
                  </svg>
                  <span>Page ${curPage - 1}</span>
                </button>`;

    return 'page1';
  }
}

export default new paginationView();
