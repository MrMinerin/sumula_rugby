window.addEventListener("load", editTime(), false);
var id;

function editTime(){
  id = window.location.hash.substring(1);
  times = JSON.parse(localStorage.getItem('Times'));
  $('#nomeTime').val(times[id].nome)
  $('#cnpj').val(times[id].c);
  $('#nomeResponsavel').val(times[id].nomeR);
  $('#cpfResponsavel').val(times[id].cpfR);
}




$('#editarTime').submit(function (event){
  var times = JSON.parse(localStorage.getItem('Times'));
  var verificarDisponibilidade;
  if (times[id].c != $('#cnpj').val()) {
    for (var i = 0; i < times.length; i++) {
      if (times[i].c == $('#cnpj').val()) {
        verificarDisponibilidade = true;
      }
    }
  }

  if (verificarDisponibilidade == true) {
    alert ('Time ja esta cadastrado');
    verificarDisponibilidade = false;
  } else {
    times[id].nome = $('#nomeTime').val()
    times[id].c = $('#cnpj').val();
    times[id].nomeR = $('#nomeResponsavel').val();
    times[id].cpfR = $('#cpfResponsavel').val();
    times[id].pontos = times[id].pontos
    localStorage.setItem('Times', JSON.stringify(times))

    window.location.href = "view.html"
  }
  event.preventDefault();
});

function excluir(){
  time = JSON.parse(localStorage.getItem('Times'));
  times.splice(id,1)
  localStorage.setItem('Times', JSON.stringify(times))
  window.location.href = "view.html"
}
