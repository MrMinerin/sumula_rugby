var listar= $('#montrar-atletas');

$(window).on('load', function() {
  listarAtletas(null, 'nome');
});




$('#search').keypress(function(event){
  if (event.which == 13){
    search = ($(this).val().toUpperCase());
    listarAtletas(search, 'nome');
  }
});

function listarAtletas(search, order){
  app.child('atletas').orderByChild(order).startAt(search).endAt(search+'\u00A0').once('value', function (snapshot) {
    console.log('comecando');
    listar.html('');
    if (snapshot == null || snapshot == undefined){
      listar.append('<h4 class="center-align">Nenhum atleta cadastrado</h4>');
    } else {
      listar.html('<table class="col s12">' +
      '<thead ><tr>'+
      '<th><a href="#" name="search" rel="nome">ATLETA</a></th>'+
      '<th><a href="#" name="search" rel="informacoes/jogos">JOGOS</a></th>'+
      '<th><a href="#" name="search" rel="informacoes/pts">PTS</a></th>'+
      '<th><a href="#" name="search" rel="informacoes/try">TRY</a></th>'+
      '<th><a href="#" name="search" rel="informacoes/conv">CONV</a></th>'+
      '<th><a href="#" name="search" rel="informacoes/drop">DROP</a></th>'+
      '<th><a href="#" name="search" rel="informacoes/penal">PENAL</a></th>'+
      '<th><a href="#" name="search" rel="informacoes/amar">AMAR</a></th>'+
      '<th><a href="#" name="search" rel="informacoes/verm">VERM</a></th> '+
      '<th><a href="#" name="search" rel="posicao">POSICÃO</a></th>'+
      '</thead></tr>' +
      '<tbody id="list-atleta-table">' +
      '</tbody>'+
      '</table>');
      snapshot.forEach(function (item) {
        $('#list-atleta-table').append(
          '' +
          '<tr>'+
          '<td><a href="editar_atleta.html?'+item.key+'">'+item.val().nome+' '+item.val().sobrenome + ' (' +item.val().apelido+ ')</a></td>'+
          '<td>'+item.val().informacoes.jogos +'</td>'+
          '<td>'+item.val().informacoes.pts +'</td>'+
          '<td>'+item.val().informacoes.try +'</td>'+
          '<td>'+item.val().informacoes.conv +'</td>'+
          '<td>'+item.val().informacoes.drop +'</td>'+
          '<td>'+item.val().informacoes.penal +'</td>'+
          '<td>'+item.val().informacoes.amar +'</td>'+
          '<td>'+item.val().informacoes.verm +'</td>'+
          '<td>'+item.val().posicao +'</td>'+
          '</tr>'+
          '');
        });
      }
      $('a[name=search]').click(function (){
        console.log('click');
        console.log($(this).html().toLowerCase());
        listarAtletas(null ,$(this).attr('rel'));
      })
    });
  }
