const BASE_URL = 'http://localhost:5000';
// hosting krte waqt on real server will be changed to yourApp.heroku.com aisa

export const FOODS_URL = BASE_URL + '/api/foods';
export const FOODS_TAGS_URL = FOODS_URL + '/tags';
export const FOODS_BY_SEARCH_URL = FOODS_URL + '/search/';
export const FOODS_BY_TAG_URL = FOODS_URL + '/tag/';
export const FOOD_BY_ID_URL = FOODS_URL + '/';

// param wali mein just passed /

export const USER_LOGIN_URL = BASE_URL + '/api/users/login';
