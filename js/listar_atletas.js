var id = window.location.search.substring(1);
var list = $('.list-atleta');
const app = firebase.database().ref();


$(document).ready(function(){
  $('.enviar-escalacao').hide();
  $('.cancelar-escalacao').hide();
  list_time_jogadores();
})

$('.escalar').click(function(){
  $(this).hide();
  $('.enviar-escalacao').show();
  $('.cancelar-escalacao').show();
  list_all_jogadores();

})

$('.cancelar-escalacao').click(function() {
  $('.enviar-escalacao').hide();
  $('.cancelar-escalacao').hide();
  $('.escalar').show();
  list_time_jogadores();
})



function list_all_jogadores() {
  list.html('<table>' +
  '<thead > <th></th> <th>Apelido</th> <th>Nome</th> <th>Posicão</th> </thead>' +
  '<tbody id="list-atleta-table">' +
  '</tbody>'+
  '</table>');
  var cont = 1;
    listAll();
    function listAll() {
      console.log('listando');
      app.child('atletas').on('value', function (snapshot) {

        console.log('teste');
        snapshot.forEach(function (item) {
          console.log(item.val().equipe);

          if (item.val().equipe == null || item.val().equipe == undefined) {
            $('#list-atleta-table').append(
              '<tr><td class="center-align"><input type="checkbox" class="filled-in" name="atleta" id="'+item.key+'" value="'+item.key+'"/><label for="'+item.key+'"></label></td> '+
              '<td>'+item.val().apelido+'</td> <td>'+ item.val().nome+' '+item.val().sobrenome +
              '</td>'+
              '<td>'+item.val().posicao +
              '</td></tr>');
              cont ++;
            }

          });
          if (cont == 1) {
            list.html('');
            list.append('<h6 class="center-align">Nenhum jogador cadastrado</h6>')
          }
        });
      }
  }


  function list_time_jogadores() {
    list.html('');
    var atletas = app.child('times/'+id+'/escalacao');
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
