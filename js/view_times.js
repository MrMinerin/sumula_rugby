$(window).on('load', function() {
  var listar= $('#mostrarTimes');
  listar.html('');
  console.log('listando');
  firebase.database().ref('times').on('value', function (snapshot) {
    snapshot.forEach(function (item) {
      listar.append('<h5 class="col s7">'+item.val().nome+'</h5></button><a href="editar_time.html?'+item.key+'" class="waves-effect waves-light btn btn-time col s2 offset-s1"><i class="material-icons left">visibility</i></a>');
    });
  });
});
