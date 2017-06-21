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
  console.log(id);
  console.log('listando');
  var atleta = app.child('atletas/'+id);
  atleta.on('value', function (item) {
    console.log(item.val());
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
    time_atual = item.val().time;
    console.log(time_atual);
  });
  $(document).ready(function(){
    $('select').material_select();
  });

  $ (document).ready(function(){
    $(".add").submit(function(event){
      save($(this).attr("id"));
      event.preventDefault();
    });
    function save(docName){
      var elementos = $('#' + docName + ' input, select');
      var time = $('#time').val();
      var obj = {}

      for (let i = 0; i < elementos.length; i++) {
        obj[elementos.eq(i).attr('name')] = elementos.eq(i).val();
        elementos.eq(i).val("");
      }

      delete obj.undefined;
      obj.data = new Date();
      console.log(obj);
      atleta.update(obj);
      rmvAtTime(time_atual, id);
      addAtTime(time, id);
      location.reload();
    }
  });
}

function addAtTime(time, atleta) {
  console.log('addjgtime');
  var jogadores = {}
  jogadores[atleta] = true;
  app.child('times/' + time).child('jogadores').update(jogadores);
}

function rmvAtTime(time,atleta) {
  console.log('rmvjogtime');
  var jogadores = {}
  jogadores[atleta] = null;
  app.child('times'/ + time).child('jogadores').set(jogadores);
}
