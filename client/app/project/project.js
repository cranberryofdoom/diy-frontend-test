$(function() {
  var path = location.pathname.split("/");
  $("textarea").keypress(function(ev) {
    var textareaEl = $(this);
    if (ev.which == "13" && textareaEl.val() !== "") {
      var projectDetailURL = "http://api.diy.org//makers/" + path[1] + "/projects/" + path[2] + "/comments"
      var token = "1e46f166df5924b81c4ad393a9d781b64c9203f9"
      $.ajax({
        type: "POST",
        url: projectDetailURL,
        beforeSend: function(request) {
          request.setRequestHeader("x-diy-api-token", token);
        },
        data: {
          raw: textareaEl.val()
        }
      }).done(function(response, status) {
        location.reload();
      }).fail(function(error, status) {
        console.log(error)
      });
    }
  });
});
