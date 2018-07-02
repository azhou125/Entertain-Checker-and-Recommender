//////////////////////Lightbox Video//////////////////////
function renderVideo(){

    $('.js-search-results, .js-recommend-results').on('click','.video-runner',function(event){

    const modal = $('#myModal').removeClass('hidden');
    
    const video_id=$(this).attr("video-id");

    const iframe=$(".modal-content");
    iframe.attr("src",`https://www.youtube.com/embed/${video_id}`);
    // iframe.attr("title",title);

    const closeButton=$(".modal .close");
    closeButton.focus();
  })

}

function closeVideo(){
  // When the user clicks on (x) button, close the modal and remove the rendered video
  $('.close').on('click',function(event){
    $('#myModal').addClass('hidden');
    $('.modal-content').removeAttr("src");
  });
}