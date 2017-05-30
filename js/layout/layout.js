$(window).on('load', function () {
  $.ajax({ url: 'layout.html', success: function(data){
    $('#layout').html(data)
    $(".dropdown-button").dropdown();
  }});
});
