$(function() {
  $(document).on('click', '.button.follow', function() {
    var _button = $(this);
    var user_id = $(this).data('user_id');

    user_id
    $.ajax({
      url: '/' + user_id +'/follow',
      type: 'PUT',
    })
    .done(function(result) {
      if (result.following)
        _button.html('Unfollow');
      else
        _button.html('Follow');
      _button.toggleClass('__following');
    }).
    error(function(result){
      console.log(result);
    });
  });

  $(document).on('click', '.alert .close', function() {
    $(this).parent().slideToggle();
  });
});
