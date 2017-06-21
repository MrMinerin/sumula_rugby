var search = window.location.search.substring(1).split('&');
var id = search[0];
var order = 'nome';

if (search.length > 1) {
  order = search[1];
}
var list = $('.list-atleta');


$(document).ready(function(){
  list_time_jogadores();
})

function list_time_jogadores() {
list.html('');
var atletas = app.child('times/'+id+'/jogadores');
atletas.on('value', function(snapshot) {
  console.log(snapshot.val());
  if (snapshot.val() == null) {
    list.append('<h6 class="center-align">Nenhum Jogador Nesse Time</h6>')
  } else {
    list.html('<table>' +
    '<thead ><th>Apelido</th> <th>Nome</th> <th>Posicão</th> </thead>' +
    '<tbody id="list-atleta-table">' +
    '</tbody>'+
    '</table>');
    snapshot.forEach(function(data){
      console.log(data.key);
      var atleta = app.child('atletas/'+data.key);
      atleta.on('value', function(item){
        console.log(item.val());
        $('#list-atleta-table').append(
          '<tr>'+
          '<td>'+item.val().apelido+'</td> <td>'+ item.val().nome+' '+item.val().sobrenome +
          '</td>'+
          '<td>'+item.val().posicao +
          '</td></tr>');
        })
      });
    }
  });
}
