'use strict';
//////////////////////Building Youtbue HTML//////////////////////
function renderYoutubeResultHTML(result) {
  const pic_url=result.snippet.thumbnails.default.url;
  const video_id=result.id.videoId;
  const channel_id=result.snippet.channelId;
  const title=result.snippet.title;
  return `
    <img src="${pic_url}" alt="Video Image" video-id="${video_id}" channel-id="${channel_id}" aria-label="Video title: ${title}. click to play it in the light box" class="video-runner video-img">
  `;
}

function handleNextPrevPage(){
  $('.js-search-results-page-button').on('click','.pageButton',function(event){
    const query=$(this).data("query");
    const pageToken=$(this).data("token");
    getDataFromApi(query, displayGitHubSearchData, pageToken);
  })
}

function displayYoutubeSearchData(data,searchTerm) {

  const results = data.items.map((item, index) => renderYoutubeResultHTML(item));
  return results.join("\n");

}
///////////////////////////////////////////////////////////////
function openWiki(){
  $(".js-result").on("click",".wiki-button",function(event){
    window.open($(this).data("url"), '_blank');
  })
}

function renderResultHTML(itemData,youtubeData){
  const theName=itemData.Name;
  const theType=itemData.Type;
  const description=itemData.wTeaser;
  const wikiURL=itemData.wUrl;
  const videoURL=itemData.yUrl;
  const videoID=itemData.yID;
  const youTubeResult=displayYoutubeSearchData(youtubeData,theName);
  const result=`
    <section class="single-result">
      <p class="resultName">Name: ${theName}</p>
      <p class="resultType">Type: ${theType}</p>
      <p class="resultDescription">Description: ${description}</p>
      <section class="more-info">
        <button class="wiki-button" data-url="${wikiURL}">Go to Wiki</button>
        <button class="video-runner" video-id="${videoID}" data-url="${videoURL}">Intro Video</button>
      </section>
      <h3>Youtube videos:</h3>
      <block class="youtube-video-list">
        ${youTubeResult}
      </block>
    <section class="single-result">
  `;

  return result;
}

function getYoutubeData(query){
  return new Promise(function(resolve,reject){
    getDataFromYoutubeApi(query, function(response,result){
      resolve(response);
    });
  });
}

function displaySearchResult(searchInfo){
  $('.js-search-results').html("<h2 class='sub-header'>Results:</h2>");
  getYoutubeData(searchInfo.Name).then(function(result){
    $('.js-search-results').append(renderResultHTML(searchInfo,result));
  })
  $('.js-search-results').removeClass('hidden');
}

function displayRecommendResult(recommendInfo){
  $('.js-recommend-results').html("<h2 class='sub-header'>Recommendations:</h2>");
  Promise.all(recommendInfo.map((item,index)=>{
    return getYoutubeData(item.Name);
  })).then(function(results){
    $(".js-recommend-results").append(results.map((item,index)=>renderResultHTML(recommendInfo[index],item)))
  })
  $('.js-recommend-results').removeClass('hidden');
}


function displayTasteDiveResult(data){
  displaySearchResult(data.Similar.Info[0]);
  displayRecommendResult(data.Similar.Results);
}

function handleSubmit(){
  $('.js-search-form').submit(event => {
    event.preventDefault();
    const queryTarget = $(event.currentTarget).find('.js-query');
    const queryTypeSelection = $(event.currentTarget).find('.js-query-type');
    const query = queryTarget.val();
    const queryType = queryTypeSelection.val();

    // clear out the input for searchTerm
    queryTarget.val("");

    getDataFromTasteDiveApi(query,queryType, displayTasteDiveResult);
  });
}

function eventHandler(){
  handleSubmit();
  renderVideo();
  closeVideo();
  openWiki();
}

$(eventHandler)