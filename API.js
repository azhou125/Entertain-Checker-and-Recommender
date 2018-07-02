//////////////////////Tastedive API//////////////////////

const SEARCH_URL = 'https://tastedive.com/api/similar';

function getDataFromTasteDiveApi(searchTerm, searchType, callbackFunc, pageToken=null) {

  const settings = {
    url: SEARCH_URL,
    data: {
      k:'311894-AndyZhou-G94QMHTI',
      q: `${searchTerm}`,
      type:`${searchType}`,
      info:1,
      limit:5,
    },
    dataType: 'jsonp',
    type: 'GET',
    success: callbackFunc
  };
  $.ajax(settings);
}


//////////////////////Youtube API//////////////////////
const Youtube_SEARCH_URL = 'https://www.googleapis.com/youtube/v3/search';

function getDataFromYoutubeApi(searchTerm, callback, pageToken=null) {

  const settings = {
    url: Youtube_SEARCH_URL,
    data: {
      part: 'snippet',
      key:'AIzaSyDDGW5TBv-YkEJgkuJizHyfoszDr5kIqEg',
      q: `${searchTerm} in:name`,
      // per_page: 10
    },
    dataType: 'json',
    type: 'GET',
    success: function(response){callback(response,searchTerm)}
  };
  if(pageToken){
    settings.data.pageToken=pageToken;
  }
  $.ajax(settings);
}