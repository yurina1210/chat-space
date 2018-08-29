$(document).on('turbolinks:load', function() {
  function buildHTML(message){
    var image = message.image ? `<img src = ${message.image}>`: "";
    var html = `<div class = "chat__body__messages" data-message-id = ${message.id}>
                  <div class = "chat__body__messages__header">
                    <div class = "chat__body__messages__header__name">
                      ${message.user_name}
                    </div>
                    <div class = "chat__body__messages__header__date">
                      ${message.created_at}
                    </div>
                  </div>
                  <div class = "chat__body__messages__message">
                    <p class = "chat__body__messages__message__content">
                      ${message.content}
                    </p>
                    <img class = "chat__body__messages__message__image">
                      ${image}
                  </div>
                </div>`
    return html;
  }
  $("#new_message").on("submit", function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action')
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.chat__body').append(html);
      $('.chat__body').animate({
      scrollTop: $('.chat__body')[0].scrollHeight}, 'fast');
      $("#new_message")[0].reset();
      $('.form__submit').prop('disabled', false);
    })
    .fail(function(){
      alert('入力エラーです');
    })
  })

  var interval = setInterval(function() {
    if (window.location.pathname.match(/\/groups\/\d+\/messages/)) {
  var messageId = $('.chat__body__messages:last').data('message-id');
  $.ajax({
    url: location.href,
    type: "GET",
    dataType: 'json',
    data: {id: messageId}
  })
  .done(function(data) {
    var insertHTML = '';
   if (data.length) {
      data.forEach(function(message) {
        insertHTML += buildHTML(message);
      });
    }
    $('.chat__body__messages:last').append(insertHTML);
  })
  .fail(function(data) {
    alert('自動更新に失敗しました');
  });
} else {
    clearInterval(interval);
   }} , 5 * 1000 );

});
