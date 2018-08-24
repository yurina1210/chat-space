$(function(){
  function buildHTML(message){
    console.log(message)
    var image = message.image ? `<img src = ${message.image}>`: "";
    var html = `<div class = "chat__body__header">
                  <div class = "chat__body__header__name">
                    ${message.user_name}
                  </div>
                  <div class = "chat__body__header__date">
                    ${message.created_at}
                  </div>
                </div>
                <div class = "chat__body__message">
                  <p class = "chat__body__message__content">
                    ${message.content}
                  </p>
                  <img class = "chat__body__message__image">
                    ${image}
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
});
