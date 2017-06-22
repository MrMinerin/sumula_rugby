var id;

$(document).ready(function(){
  editAtleta();
  $('.cancelar').hide();
  $('.enviar').hide();
})

$('.cancelar').click(function(){
  $('input, select').prop("disabled", true);
  $(this).hide();
  $('.enviar').hide();
  $('.editar').show();
  editAtleta();
})


$('.editar').click(function(){
  $('input, select').prop("disabled", false);
  $(this).hide();
  $('.cancelar').show();
  $('.enviar').show();
  editAtleta();
})

function editAtleta(){
  id = window.location.search.substring(1);
  var time_atual;
  var time;
  console.log('jogador: '+ id);
  console.log('listando');
  var atleta = app.child('atletas/'+id);
  atleta.on('value', function (item) {
    $('#nome').val(item.val().nome)
    $('#apelido').val(item.val().apelido);
    $('#sobrenome').val(item.val().sobrenome);
    $('#cpf').val(item.val().cpf);
    $('#nascimento').val(item.val().nascimento);
    $('#altura').val(item.val().altura);
    $('#peso').val(item.val().peso);
    $('#posicao').val(item.val().posicao);
    $('#time').val(item.val().time);
    $('label').addClass('active');
    $('input').removeClass('valid');
    console.log('time atual: ' + time_atual);
  });
  
  time_atual = $('#time').val();
  $('#time').change(function(){
    time = $('#time').val();
  })

  $(document).ready(function(){
    $('select').material_select();
  });

  $ (document).ready(function(){
    $(".add").submit(function(event){
      docName = $(this).attr("id");
      var elementos = $('#' + docName + ' input, select');
      var obj = {}

      for (let i = 0; i < elementos.length; i++) {
        obj[elementos.eq(i).attr('name')] = elementos.eq(i).val();
        elementos.eq(i).val("");
      }

      delete obj.undefined;
      obj.data = new Date();
      console.log(obj);
      atleta.update(obj);
      addAtTime(time, id);
      rmvAtTime(time_atual, id);
      // location.reload();
      event.preventDefault();
    });
  });
}

function addAtTime(time, atleta) {
  console.log('addjgtime');
  var jogadores = {};
  jogadores[atleta] = true;
  app.child('times/' + time).child('jogadores').update(jogadores);
}

function rmvAtTime(time,atleta) {
  console.log('rmvjogtime');
  var jogadores = {};
  jogadores[atleta] = false;
  app.child('times/' + time).child('jogadores').update(jogadores);
  console.log('update time antigo');
}
