$('#form_ecalar_usuario').submit(function(){
  var id = window.location.search.substring(1);
  var escalacao = {};
  var time = {};

  var atleta = document.getElementsByName('atleta');


  for(var i = 0; i < atleta.length; i++) {
    console.log(atleta.length);
    if (atleta[i].checked) {
      escalacao[atleta[i].value] = true;

      time[atleta[i].value+'/equipe/'+id] = true;
    }
  }
  console.log(escalacao);
  var keyTime = firebase.database().ref().child('times/'+id);
  var keyAtleta = firebase.database().ref().child('atletas/');

  keyTime.child('escalacao').update(escalacao);

  console.log(time);

  keyAtleta.update(time);
  location.reload();
})
