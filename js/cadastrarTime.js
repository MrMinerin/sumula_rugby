// $ (document).ready(function(){
//   $(".add").on("click", function(event){
//     save($(this).parent("form").attr("id"));
//     event.preventDefault();
//   });
//   function save(docName){
//     var inputs = $('#' + docName + ' input');
//     var selects = $('#' + docName + ' select');
//     var obj = {}
//     for (let i = 0; i < inputs.length; i++) {
//       obj[inputs.eq(i).attr('name')] = inputs.eq(i).val();
//       inputs.eq(i).val("");
//     }
//     for (let i = 0; i < selects.length; i++) {
//       obj[selects.eq(i).attr('name')] = inputs.eq(i).val();
//       selects.eq(i).val("");
//     }
//     firebase.database().ref().child(docName).push(obj);
//   }
// });

function recuperarDados(){
  console.log("ola");
  firebase.database().ref('times').on('value', function (dados){
    dados.forEach(function(item) {
      console.log("ola");
      return item.val().nomeTime;
    });
  })
}

function cpfVerificacao(cpf){
  var numero = cpf.replace('-','');
  console.log(numero);
}

$(".add").click(function (){
  var validat = $( "#times" ).validate({
    invalidHandler: function(event, validator){
    var errors = validator.numberOfInvalids();
    console.log(errors);
    }

  });

})
