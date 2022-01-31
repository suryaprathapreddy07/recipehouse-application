// import { View } from './view.js';
// class SearchResultsView extends View {
//   _parentEl = document.querySelector('.search');
//   // _form = document.querySelector('.search');
//   _ErrorMessage = `No recipes found for your query. Please try again`;
//   _message = '';

//   addHandlerRender(handler) {
//     this._parentEl.addEventListener('submit', function (e) {
//       e.preventDefault();
//       handler();
//     });
//   }
//   clearInput() {
//     this._parentEl.querySelector('.search__field').value = '';
//   }

//   getQuery() {
//     const query = this._parentEl.querySelector('.search__field').value;
//     this.clearInput();
//     return query;
//   }

//   _generatemarkup() {
//     // return `${this._data
//     //   .map(
//     //   .join(' ')}`;
//     return `${this._data
//       .map(recp => this._generatemarkupPreview(recp))
//       .join('')}`;
//   }
//   _generatemarkupPreview(result) {
//     return `<li class="preview">
//             <a class="preview__link preview__link--active" href="#${result.id}">
//               <figure class="preview__fig">
//                 <img src="${result.image}" alt="Test" />
//               </figure>
//               <div class="preview__data">
//                 <h4 class="preview__title">${result.title}</h4>
//                 <p class="preview__publisher">${result.publisher}</p>
//                 <div class="preview__user-generated">

//                 </div>
//               </div>
//             </a>
//           </li>`;
//   }
// }
// export default new SearchResultsView();
