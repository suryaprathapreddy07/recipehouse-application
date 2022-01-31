import * as model from './model.js';
import recipeView from './views/recipeView.js';
// import searchResultsView from './views/searchResultsView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';
import bookmarksView from './views/bookmarksView.js';
import uploadRecipeView from './views/uploadRecipeView.js';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
const recipeContainer = document.querySelector('.recipe');

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

//implementing recipe fetching
const controlRecipes = async function () {
  try {
    //getting id from search bar
    const id = window.location.hash.slice(1);
    if (!id) return;

    resultsView.render(model.getSearchResultsPerPage());

    //loading spinner
    recipeView.renderSpinner();

    //loading recipe
    await model.loadRecipe(id);
    const recipe = model.state.recipe;
    // console.log(recipe);

    //rendering recipe
    recipeView.render(recipe);
    model.state.bookmarks.length > 0
      ? bookmarksView.render(model.state.bookmarks)
      : bookmarksView.renderErrorMessage();
  } catch (err) {
    recipeView.renderErrorMessage();
  }
};

const controlSearchResults = async function () {
  try {
    const query = searchView.getQuery();
    model.state.searchResults.page = 1;
    //rendering spinner
    resultsView.renderSpinner();

    await model.loadSearchResults(query);

    //calling render method on search methods
    // console.log(model.getSearchResultsPerPage(3));
    resultsView.render(model.getSearchResultsPerPage());

    //
    paginationView.render(model.state.searchResults);
  } catch (err) {
    resultsView.renderErrorMessage();
  }
};

//implementing pagination view function
const contolPaginationResults = function (goToPage = 1) {
  resultsView.render(model.getSearchResultsPerPage(goToPage));

  //
  paginationView.render(model.state.searchResults);
};

//control for bookmarks
const controlBookmarks = function () {
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.removeBookmark(model.state.recipe.id);
  recipeView.render(model.state.recipe);
  // if (model.state.bookmarks.length === 0) console.log('true');
  // else console.log('false');
  model.state.bookmarks.length > 0
    ? bookmarksView.render(model.state.bookmarks)
    : bookmarksView.renderErrorMessage();
};
const controlStorage = function () {
  if (model.state.bookmarks.length > 0)
    bookmarksView.render(model.state.bookmarks);
  else bookmarksView.renderErrorMessage();
};

//implementing controller for uploading recipe
const controlUploadRecipe = async function (recipe) {
  try {
    await model.uploadRecipeApi(recipe);
  } catch (err) {
    uploadRecipeView.renderErrorMessage(err.message);
  }
};
//implementing init function
const init = function () {
  bookmarksView.addHandlerStorage(controlStorage);
  //this is called publisher subscriber pattren
  //loading recipies on listening events
  recipeView.addHandlerRender(controlRecipes);
  //loading search results
  searchView.addHandlerRender(controlSearchResults);
  //loading pagiation
  paginationView._addHandlerPagination(contolPaginationResults);
  //bookmark handler
  recipeView.addHandlerAddBookmark(controlBookmarks);
  uploadRecipeView.addHandlerUploadRecipe(controlUploadRecipe);
  //adding welcome message
  console.log('WELCOME TO APPLICATION');
};
init();
// bookmarksView.render(model.state.bookmarks);
// resultsView.renderSpinner();
// console.log(document.querySelector('.results-spinner'));
