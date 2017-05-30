window.addEventListener("load", editTime(), false);
var id;

function editTime(){
  id = window.location.hash.substring(1);

  console.log(id);
  console.log('listando');
  var time = firebase.database().ref().child('times/'+id);
  time.on('value', function (item) {
    console.log(item.val());
    $('#nomeTime').val(item.val().nome)
    $('#cnpj').val(item.val().cnpj);
    $('#nomeResponsavel').val(item.val().responsavel);
    $('#cpfResponsavel').val(item.val().cpf);
    $('label').addClass('active')
  });

  $ (document).ready(function(){
    $(".add").on("click", function(event){
      save($(this).parent("form").attr("id"));
      event.preventDefault();
    });
    function save(docName){
      var inputs = $('#' + docName + ' input');
      var selects = $('#' + docName + ' select');
      var obj = {}

      for (let i = 0; i < inputs.length; i++) {
        obj[inputs.eq(i).attr('name')] = inputs.eq(i).val();
        inputs.eq(i).val("");
      }

      if (selects.length > 0) {
        for (let i = 0; i < selects.length; i++) {
          obj[selects.eq(i).attr('name')] = selects.eq(i).val();
          console.log(selects.eq(i).attr('id'));
          selects.eq(i).val("");
        }
      }

      delete obj.undefined;
      obj.data = new Date();
      console.log(obj);
      time.update(obj);
      location.reload();
    }
  });
}
