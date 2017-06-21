window.addEventListener("load", editTime(), false);
var id;

function editTime(){
  id = window.location.search.substring(1);

  console.log(id);
  console.log('listando');
  var time = app.child('times/'+id);
  time.on('value', function (item) {
    console.log(item.val());
    $('#nomeTime').val(item.val().nome)
    $('#cnpj').val(item.val().cnpj);
    $('#nomeResponsavel').val(item.val().responsavel);
    $('#cpfResponsavel').val(item.val().cpf);
    $('label').addClass('active');
    $('input').removeClass('valid');
  });

  $ (document).ready(function(){
    $(".add").submit(function(event){
      save($(this).attr("id"));
      event.preventDefault();
    });
    function save(docName){
      var elementos = $('#' + docName + ' input, select');
      var obj = {}

      for (let i = 0; i < elementos.length; i++) {
        obj[elementos.eq(i).attr('name')] = elementos.eq(i).val().toUpperCase();
        elementos.eq(i).val("");
      }

      delete obj.undefined;
      obj.data_ultima_alteracao = new Date();
      console.log(obj);
      time.update(obj);
      location.reload();
    }
  });
}

$(document).ready(function(){
  $('.cancelar').hide();
  $('.enviar').hide();
})

$('.cancelar').click(function(){
  $('#editarTime input').prop("disabled", true);
  $(this).hide();
  $('.enviar').hide();
  $('.editar').show();
  editTime();
})



$('.editar').click(function(){
  $('input').prop("disabled", false);
  $(this).hide();
  $('.cancelar').show();
  $('.enviar').show();
})
