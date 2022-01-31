import { async } from 'regenerator-runtime';
import { API_KEY, API_URl, RESULTS_PER_PAGE } from './config';
import { getJson, sendJson } from './helper';

export const state = {
  recipe: {},
  searchResults: {
    query: '',
    results: [],
    resultsPerPage: RESULTS_PER_PAGE,
    page: 1,
  },
  bookmarks: [],
};

export const loadRecipe = async function (id) {
  try {
    //fetching recipe data using api
    const data = await getJson(
      `https://forkify-api.herokuapp.com/api/v2/recipes/${id}`
    );
    let { recipe } = data.data;
    state.recipe = {
      image: recipe.image_url,
      ingredients: recipe.ingredients,
      publisher: recipe.publisher,
      publisherUrl: recipe.publisher_url,
      id: recipe.id,
      srcUrl: recipe.source_url,
      title: recipe.title,
      cookingTime: recipe.cooking_time,
    };

    if (state.bookmarks.some(bookmark => bookmark.id === recipe.id)) {
      state.recipe.bookmarked = true;
      console.log('bookmarked');
    }
  } catch (err) {
    throw err;
  }
};

export const loadSearchResults = async function (query) {
  //saving query in state
  state.searchResults.query = query;
  if (!query) return;
  //fetching search data using api
  const data = await getJson(
    ` https://forkify-api.herokuapp.com/api/v2/recipes?search=${query}`
  );
  console.log(data);
  state.searchResults.results = data.data.recipes.map(
    recp =>
      (recp = {
        image: recp.image_url,
        publisher: recp.publisher,
        // publisherUrl: recp.publisher_url,
        id: recp.id,
        srcUrl: recp.source_url,
        title: recp.title,
      })
  );
};

//impementing searchresultsperpage function
export const getSearchResultsPerPage = function (
  page = state.searchResults.page
) {
  state.searchResults.page = page;
  const start = (page - 1) * RESULTS_PER_PAGE;
  const end = page * RESULTS_PER_PAGE;
  return state.searchResults.results.slice(start, end);
};

//implementing local storage
const setLocalStorage = function () {
  localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks));
};

//implementing addBookmark function
export const addBookmark = function (recipe) {
  state.bookmarks.push(recipe);
  if (recipe.id === state.recipe.id) state.recipe.bookmarked = true;
  // console.log(state.bookmarks);
  setLocalStorage();
};

//implementing removeBookmark function
export const removeBookmark = function (id) {
  const index = state.bookmarks.findIndex(el => id === state.recipe.id);
  state.bookmarks.splice(index, 1);
  if (id === state.recipe.id) state.recipe.bookmarked = false;
  setLocalStorage();
};
const init = function () {
  const storage = localStorage.getItem('bookmarks');
  if (storage) {
    if (JSON.parse(storage).length > 0) state.bookmarks = JSON.parse(storage);
  }
  // if (storage.length === 0) console.log('bookmarks not found');
  // console.log(state.bookmarks);
};
init();

//implementing uploadRecipe function
export const uploadRecipeApi = async function (newrecipe) {
  try {
    // const data = Object.entries(newrecipe);
    const ingredients = Object.entries(newrecipe)
      .filter(ele => ele[0].startsWith('ingredient') && ele[1] != '')
      .map(ing => {
        const ingArr = ing[1].split(',');
        if (ingArr.length < 3)
          throw new Error(
            'invalid format, please fill the form in a mentiond format'
          );
        const [quantity, unit, description] = ingArr;
        return { quantity, unit, description };
      });
    // console.log(ingredients);
    console.log(ingredients);
    // console.log(newrecipe);
    const recipe = {
      image_url: newrecipe.image,
      ingredients: ingredients,
      publisher: newrecipe.publisher,
      source_url: newrecipe.sourceUrl,
      title: newrecipe.title,
    };
    data = await sendJson(`${API_URl}?&key=${API_KEY}`, recipe);
    console.log(data);
  } catch (err) {
    throw err;
  }
};
