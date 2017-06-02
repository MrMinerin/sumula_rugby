$(document).ready(function(){
    $('ul.tabs').tabs();
  });


// -----------------------------------Carregar Jogos-----------------------------------------

function showJogos(loadJogos){
  listar = $('#mostrarJogos');
  times = JSON.parse(localStorage.getItem('Times'));
  if (loadJogos == null) {
    listar.append('<h5 class="col s12 center-align"> Nenhum jogo registrado</h5>');
  } else {
    for (var i = 0; i < loadJogos.length; i++) {
    	for (var i2 = 0; i2 < times.length; i2++) {
    		if (times[i2].id == loadJogos[i].time1) {
    			for (var i3 = 0; i3 < times.length; i3++) {
    				if (times[i3].id == loadJogos[i].time2) {
    					listar.append('<h5 class="col s12 m4 center-align">' + times[i2].nome + ': '+ loadJogos[i].time1P + '</h5><img class="col s12 m2 x center-align " src="img/x.png"> <h5 class="col s12 m4 center-align">'+ loadJogos[i].time2P+ ': '+ times[i3].nome +  '</h5><h5 class="col s12 m2 center-align">' + loadJogos[i].data + '</h5>')
    				}
    			}
    		}
    	}
    }
  }
}

function hanking(times){
  listar = $('#mostrarHanking');
  if (times == null) {
    listar.append('<h5 class="center-align col s12">Nenhum time registrado</h5>')
  } else {
    times.sort(compare)
    function compare(a,b) {
      if (a.pontos > b.pontos)
      return -1;
      if (a.pontos < b.pontos)
      return 1;
      return 0;
    }
    for (var i = 0; i < times.length; i++) {
      console.log(times[i].nome);
      listar.append ('<h5 class="center-align col s5">'+times[i].nome+'</h5><h5 class="center-align col s5">'+times[i].pontos+'</h5><a onclick="visualizarTime('+times[i].id+')" href="#modalT'+(times[i].id)+'" rel ="modalTime" class="waves-effect waves-light btn btn-time col s2 offset-s1"><i class="material-icons left">visibility</i></a>');
    }
  }

}

// --------------------------------------Carregar Times --------------------------------

$(window).on('load', function() {
  var listar= $('#mostrarTimes');
  listar.html('');
  console.log('listando');
  firebase.database().ref('times').on('value', function (snapshot) {
    snapshot.forEach(function (item) {
      listar.append('<h5 class="col s7">'+item.val().nome+'</h5></button><a href="editarTime.html#'+item.key+'" class="waves-effect waves-light btn btn-time col s2 offset-s1"><i class="material-icons left">visibility</i></a>');
    });
  });
});

// function showTimes(loadTimes){
//   var listar= $('#mostrarTimes');
//   listar.html('');
//   if (loadTimes == null) {
//     listar.append('<h5 class="col s12 center-align"> Nenhum time registrado</h5>');
//   } else {
//     for (var i = 0; i < loadTimes.length; i++) {
//       listar.append('<h5 class="col s7">'+loadTimes[i].nome+'</h5><button class="waves-effect waves-light btn btn-time col s2" onclick="showAtletas('+(i)+')"><i class="material-icons left">view_list</i></button><a onclick="visualizarTime('+i+')" href="#modalT'+(i)+'" rel ="modalTime" class="waves-effect waves-light btn btn-time col s2 offset-s1"><i class="material-icons left">visibility</i></a>');
//
//     }
//   }
// }
//
//
//
// function visualizarTime(idTime){
//
//   var modaisTime = $('#modaisTime');
//   var t = JSON.parse(localStorage.getItem('Times'));
//   modaisTime.html('');
//   modaisTime.append('<div id="modalT'+ idTime +'" class="modal modal-fixed-footer"><div class="modal-content"><h4 class="center-align">Time</h4><li class="divider1"></li><p class="flow-text col s12 m6">Nome: '+t[idTime].nome+'</p><p class="flow-text col s12 m6">CNPJ: '+t[idTime].c+'</p><p class="flow-text col s12 m6">Responsável: '+t[idTime].nomeR+'</p><p class="flow-text col s12 m6">CPF: '+t[idTime].cpfR+'</p></div><div class="modal-footer"><a href="editarTime.html#'+ idTime +'"class="modal-action waves-effect waves-red btn-flat">Editar</a></div></div></div>');
//   $('.modal').modal();
// }

// ------------------------------------Carregar Atletas------------------------------------


function showAtletas(idTime){
  loadAtletas = JSON.parse(localStorage.getItem('Atletas'));
  listar= $('#mostrarAtletas');
  listar.html('');
  var nenhum = true;
  if (loadAtletas==null) {
    listar.append('<h5 class="col s12 center-align"> Nenhum atleta registrado</h5>');
  } else {
    for (var i = 0; i < loadAtletas.length; i++) {
      if (loadAtletas[i].time == idTime) {
        listar.append('<h5 class="col s7 offset-s1">'+loadAtletas[i].apelido+'</h5><a onclick="visualizarAtleta('+(i)+')" href="#modalA'+(i)+'" rel ="modalAtleta" class="waves-effect waves-light btn btn-time col s2 offset-s1"><i class="material-icons left">visibility</i></a>');
        var nenhum = false;
      }
    }

    if (nenhum == true) {
      listar.append('<h5 class="col s12 center-align"> Nenhum atleta registrado</h5>');
    }
  }
}


function mostrarAtletas(loadAtletas){
  listar= $('#mostrarAtletas');
  listar.html('');
  if (loadAtletas == null) {
    listar.append('<h5 class="col s12 center-align"> Nenhum atleta registrado</h5>');
  } else {
    for (var i = 0; i < loadAtletas.length; i++) {
      listar.append('<h5 class="col s7 offset-s1">'+loadAtletas[i].apelido+'</h5><a onclick="visualizarAtleta('+(i)+')" href="#modalA'+(i)+'" rel ="modalAtleta" class="waves-effect waves-light btn btn-time col s2 offset-s1"><i class="material-icons left">visibility</i></a>');
    }
  }
}


function visualizarAtleta(idAtle){
  modaisAtleta= $('#modaisAtleta');
  var a = JSON.parse(localStorage.getItem('Atletas'));
  modaisAtleta.html('');
  modaisAtleta.append('<div id="modalA'+ idAtle +'" class="modal modal-fixed-footer"><div class="modal-content"><h4 class="center-align">Atleta</h4><li class="divider1"></li><p class="flow-text col s12 m6">Nome: '+a[idAtle].nome+'</p><p class="flow-text col s12 m6">Sobrenome: '+a[idAtle].sobrenome+'</p><p class="flow-text col s12 m6">Time: '+nomeDoTime(idAtle) +'</p><p class="flow-text col s12 m6">Posição: '+a[idAtle].posicao+'</p><p class="flow-text col s12 m6">Apelido: '+a[idAtle].apelido+'</p><p class="flow-text col s12 m6">CPF: '+a[idAtle].cpf+'</p><p class="flow-text col s12">Data de Nascimento: '+a[idAtle].nascimento+'</p></div><div class="modal-footer"><a class="modal-action waves-effect waves-red btn-flat" href="editarAtleta.html#'+idAtle+'">Editar</a></div></div></div>');
  $('.modal').modal();
}




// --------------------------Ver nome time atleta----------------------------------------
function nomeDoTime(idDoAtleta){
  var a = JSON.parse(localStorage.getItem('Atletas'));
  var t = JSON.parse(localStorage.getItem('Times'));

  for (var i = 0; i < t.length; i++) {
    if (a[idDoAtleta].time == t[i].id) {
      return t[i].nome
      alert (t[i].nome)
    }
  }
}


//------------------------------------Buscas---------------------------------------------------
document.getElementById("searchT").addEventListener("keypress", function(e) {
  // Trata a tecla ENTER
  var key = e.which || e.keyCode
  if (key === 13) {
    searchTime()
  }
})
document.getElementById("searchA").addEventListener("keypress", function(e) {
  // Trata a tecla ENTER
  var key = e.which || e.keyCode
  if (key === 13) {
    searchAtleta()
  }
})


function removerAcentos(s){
  var map={"â":"a","Â":"A","à":"a","À":"A","á":"a","Á":"A","ã":"a","Ã":"A","ê":"e","Ê":"E","è":"e","È":"E","é":"e","É":"E","î":"i","Î":"I","ì":"i","Ì":"I","í":"i","Í":"I","õ":"o","Õ":"O","ô":"o","Ô":"O","ò":"o","Ò":"O","ó":"o","Ó":"O","ü":"u","Ü":"U","û":"u","Û":"U","ú":"u","Ú":"U","ù":"u","Ù":"U","ç":"c","Ç":"C"};
  return s.replace(/[\W\[\] ]/g,function(a){return map[a]||a})
}


function searchAtleta() {
  $('#mensagemA').html ('');
  var atletas = JSON.parse(localStorage.getItem("Atletas"))
  var resultadoDaBusca = []
  var valor = removerAcentos((document.getElementById("searchA").value).toLowerCase())

  var nomeCompleto

  for (var posicao in atletas) {
    apelido = removerAcentos((atletas[posicao].apelido).toLowerCase())
    if (apelido.indexOf(valor) >= 0) {
      resultadoDaBusca.push(atletas[posicao])
    }
  }

  if(resultadoDaBusca.length == 0) {
    $('#mensagemA').append ('<h5>Nenhum registro localizado</h5><li class="espaco"></li>')
    mostrarAtletas(atletas)
  } else {
    mostrarAtletas(resultadoDaBusca)
  }
  $('#searchA').val('')
}

function searchTime() {
  $('#mensagemT').html ('');
  var times = JSON.parse(localStorage.getItem("Times"))
  var resultadoDaBusca = []
  var valor = removerAcentos((document.getElementById("searchT").value).toLowerCase())

  var nomeCompleto

  for (var posicao in times) {
    nome = removerAcentos((times[posicao].nome).toLowerCase())
    if (nome.indexOf(valor) >= 0) {
      resultadoDaBusca.push(times[posicao])
    }
  }

  if(resultadoDaBusca.length == 0) {
    $('#mensagemT').append ('<h5>Nenhum registro localizado</h5><li class="espaco"></li>')
    showTimes(times)
  } else {
    showTimes(resultadoDaBusca)
  }

  $('#searchT').val('')
}
