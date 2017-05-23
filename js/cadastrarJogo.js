// --------------------------Carregando Times------------------------------------------------
window.addEventListener("load", optionTime1(JSON.parse(localStorage.getItem('Times'))), false);
window.addEventListener("load", optionTime2(JSON.parse(localStorage.getItem('Times'))), false);

function optionTime1(loadTimes){
  listar = $('#selecaoTime1');
  if (loadTimes === null) {
    listar.append('<option value="" disabled>Nenhum Time Cadastrado</option>');
  } else {
    for (var i = 0; i < loadTimes.length; i++) {
      listar.append('<option value="' + i + '">' + loadTimes[i].nome + '</option>');
    }
  }
}

function optionTime2(loadTimes){
  listar = $('#selecaoTime2');
  if (loadTimes === null) {
    listar.append('<option value="" disabled>Nenhum Time Cadastrado</option>');
  } else {
    for (var i = 0; i < loadTimes.length; i++) {
      listar.append('<option value="' + i + '">' + loadTimes[i].nome + '</option>');
    }
  }
}
// ------------------------------------------------------------------------------------------



$(document).ready(function(){
  // Agora verificar o cadastro de atleta -----------------------
  $('#cadastroJogo').submit(
    function addJogo (event){
      var jogoDataJogo = $('#dataJogo').val();
      var jogoTime1P = $('#ponto1').val();
      var jogoTime1 = $('#selecaoTime1').val();
      var jogoTime2P = $('#ponto2').val();
      var jogoTime2 = $('#selecaoTime2').val();
      var jogoJuiz1 = $('#juiz1').val();
      var jogoJuiz2 = $('#juiz2').val();
      var jogoQuartoArbitro = $('#quartoArbitro').val();
      var jogoMedico = $('#medico').val();
      var jogoCrm = $('#crm').val();

      var times = JSON.parse(localStorage.getItem('Times'));
      if (jogoTime2P > jogoTime1P) {
        times[jogoTime2].pontos += 4;
      } else {
        if (jogoTime2P < jogoTime1P) {
          times[jogoTime1].pontos += 4;
        } else {
          times[jogoTime2].pontos += 2;
          times[jogoTime1].pontos += 2;
        }
      }

      localStorage.setItem('Times',JSON.stringify(times))
      if (jogoTime1 == jogoTime2) {
        alert ('Times Iguais');
      } else {

        // Cria o objeto
        var jogo = {
          id: gerarIDJogo(),
          data: jogoDataJogo,
          time1: jogoTime1,
          time1P: jogoTime1P,
          time2: jogoTime2,
          time2P: jogoTime2P,
          juiz1: jogoJuiz1,
          juiz2: jogoJuiz2,
          arbitro: jogoQuartoArbitro,
          medico: jogoMedico,
          crm: jogoCrm
        }

        // Testa se a chave 'aluno' é nula (vazia)
        if(localStorage.getItem('Jogos') === null){

          // Inicia o vetor (array)
          var jogos = []
          // Adiciona objeto no array
          jogos.push(jogo)
          // Armazena no localStorage - JSON.stringify = converte o JavaScript em nota JSON
          localStorage.setItem('Jogos', JSON.stringify(jogos))
          window.location.href = "view.html"
        } else {
          // Define uma nova variável e coloca o conteúdo de localStorage nela - JSON.parse = converte a notação JSON em JavaScript
          var jogos = JSON.parse(localStorage.getItem('Jogos'))
          var verificarDisponibilidade;
          // Adiciona objeto no array
          jogos.push(jogo);
          // Re-armazena no localStorage - JSON.stringify = converte o JavaScript em nota JSON
          localStorage.setItem('Jogos', JSON.stringify(jogos));
          window.location.href = "view.html"
        }
      }

      event.preventDefault();
    });


    function gerarIDJogo() {
      var id = JSON.parse(localStorage.getItem('idJogo'))
      if(id === null){
        localStorage.setItem('idJogo', 0);
      } else {
        id += 1
        localStorage.setItem('idJogo', id);
      }
      return JSON.parse(localStorage.getItem('idJogo'));
    }

    // _____________________________________________________________




    $(document).ready(function() {
      $('select').material_select();
    });

    // $('#teste').click(function(){
    //   alert ($('#nascimento').val());
    // });
  })
