$(function(){
  function buildHTML(message){
    var html = `.chat__body__header
                  .chat__body__header__name
                    = message.user.name
                  .chat__body__header__date
                    = format_posted_time(message.created_at)

                .chat__body__message
                  - if message.content.present?
                    %p.chat__body__message__content
                      = message.content
                  = image_tag message.image.url, class: 'chat__body__message__image' if message.image.present?`
    return html;
  }
  $("#new_message").on("submit", function(e) {
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action')
    $.ajax({
      url: url,
      type: "POST",
      data: formFata,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.messages').append(html)
      $('.textbox').val('')
    })
    .animate({
      scrollTop: 100vh
    })
    .fail(function(){
      alert('入力エラーです');
    })
  });
});
