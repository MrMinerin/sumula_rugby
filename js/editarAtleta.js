// --------------------------Carregando Times------------------------------------------------
window.addEventListener("load", optionTime(JSON.parse(localStorage.getItem('Times'))), false);
function optionTime(loadTimes){
  listar = $('#selecaoTime');
  if (loadTimes === null) {
    listar.append('<option value="" disabled >Nenhum Time Cadastrado</option>')
  } else {
    for (var i = 0; i < loadTimes.length; i++) {
      listar.append('<option value="' + i + '">' + loadTimes[i].nome + '</option>');
    }
  }
}
// ------------------------------------------------------------------------------------------

var id;
$(document).ready(function(){
  id = window.location.hash.substring(1);
  atletas = JSON.parse(localStorage.getItem('Atletas'));
  $('#selecaoTime').val(atletas[id].time);
  $('#posicao').val(atletas[id].posicao);
  $('#apelido').val(atletas[id].apelido);
  $('#nome').val(atletas[id].nome);
  $('#sobrenome').val(atletas[id].sobrenome);
  $('#nascimento').val(atletas[id].nascimento);
  $('#cpf').val(atletas[id].cpf);
})


$('#editarAtleta').submit(function (event){
  atletas = JSON.parse(localStorage.getItem('Atletas'));
  var verificarDisponibilidade;
  if (atletas[id].cpf != $('#cpf').val()) {
    for (var i = 0; i < atletas.length; i++) {
      if (atletas[i].cpf == $('#cpf').val()) {
        verificarDisponibilidade = true;
      }
    }
  }
  if (verificarDisponibilidade == true) {
    alert ('Atleta ja esta cadastrado');
    verificarDisponibilidade = false;
  } else {
    atletas[id].time = $('#selecaoTime').val();
    atletas[id].posicao = $('#posicao').val();
    atletas[id].apelido = $('#apelido').val();
    atletas[id].nome = $('#nome').val();
    atletas[id].sobrenome = $('#sobrenome').val();
    atletas[id].nascimento = $('#nascimento').val();
    atletas[id].cpf = $('#cpf').val();
    localStorage.setItem('Atletas', JSON.stringify(atletas))
    window.location.href = "view.html"
  }
  event.preventDefault();
});

function excluir(){
  atletas = JSON.parse(localStorage.getItem('Atletas'));
  atletas.splice(id,1)
  localStorage.setItem('Atletas', JSON.stringify(atletas))
  window.location.href = "view.html"
}
// _____________________________________________________________
$(document).ready(function() {
  $('select').material_select();
});
