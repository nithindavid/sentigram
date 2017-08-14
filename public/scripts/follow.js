$(function() {
  $(document).on('.user_follow_button', 'click', function() {
    var user_id = $(this).data('user_id');
    user_id
    $.ajax({
      url: '/' + user_id +'/follow',
      type: 'PUT',
    })
    .done(function(result) {
      console.log(result);
    }).
    error(function(result){
      console.log(result);
    });
  });
});
