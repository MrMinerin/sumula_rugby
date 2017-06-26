// $(window).on('load', function () {
  // $.ajax({ url: 'layout.html', success: function(data){
  //   $('#layout').html(data)
  //   $(".dropdown-button").dropdown();
  // }});
// });


$(window).on('load', function () {
  console.log(auth.currentUser);
$('#layout').html('<ul id="dropdown1" class="dropdown-content">' +
  '<li><a href="cadastrar_time.html">Cadastrar Time</a></li>' +
  '<li><a href="cadastrar_atleta.html">Cadastrar Atleta</a></li>' +
  '<li><a href="cadastrar_jogo.html">Cadastrar Jogo</a></li>' +
  '<li><a href="escalar_time.html">Escalar Time</a></li>' +
  '</ul>' +
  '<div class="fixed">' +
  '<nav class="teal z-depth-5">' +
  '<div class="nav-wraper">' +
  '<a href="#" class="brand-logo center">Rugby</a>' +
  '<ul class="right hide-on-med-and-down">' +
  '<li><a href="view.html">Início</a></li>' +
  '<li><a href="view_times.html">Times</a></li>' +
  '<li><a href="view_atletas.html">Atletas</a></li>' +
  '<li><a class="dropdown-button" href="#!" data-activates="dropdown1">Cadastrar<i class="material-icons right">arrow_drop_down</i></a></li>' +
  (auth.currentUser == null ? '<li><a href="login.html" id="entrar">Entrar</a></li>' : '<li><a id="sair">Sair</a></li>') +
  '</ul>' +
  '</div>' +
  '</nav>' +
  '</div>'
);
  $(".dropdown-button").dropdown();
  $('#sair').click(function (){
    auth.signOut().then(function() {
      console.log('deslogado');
    }, function(error) {
      // An error happened.
    });
  });
  $('#entrar').click(function(){
    $.ajax({ url: 'login.html', success: function(data){
      $.get(this.href, function(html) {
        $(html).appendTo(data).modal();
      });
    }});
  });
});

var myWindow = window.open("", "", "width=200,height=100");
