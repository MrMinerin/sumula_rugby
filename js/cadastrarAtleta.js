// --------------------------Carregando Times------------------------------------------------
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
    firebase.database().ref().child(docName).push(obj);
  }
});


$(document).ready(function (){
  $(".dropdown-button").dropdown();
});
$(document).ready(function(){
  $('select').material_select();
});

// window.addEventListener("load", optionTime(JSON.parse(localStorage.getItem('Times'))), false);
// function optionTime(loadTimes){
//   listar = $('#selecaoTime');
//   if (loadTimes === null) {
//     listar.append('<option value="" disabled>Nenhum Time Cadastrado</option>')
//   } else {
//     for (var i = 0; i < loadTimes.length; i++) {
//       listar.append('<option value="' + i + '">' + loadTimes[i].nome + '</option>');
//     }
//   }
// }
// // ------------------------------------------------------------------------------------------
// $(document).ready(function(){
//   var loadAtletas = JSON.parse(localStorage.getItem('Atletas'))
//   // Agora verificar o cadastro de atleta -----------------------
//   $('#cadastroAtleta').submit(
//     function addAtleta (event){
//       var atletaTime = $('#selecaoTime').val();
//       var atletaPosicao = $('#posicao').val();
//       var atletaApelido = $('#apelido').val();
//       var atletaNome = $('#nome').val();
//       var atletaSobrenome = $('#sobrenome').val();
//       var atletaNascimento = $('#nascimento').val();
//       var atletaCpf = $('#cpf').val();
//
//       // Testa se a chave 'aluno' é nula (vazia)
//       if(localStorage.getItem('Atletas') === null){
//         // Cria o objeto
//         var atleta = {
//             id: gerarIDAtleta(),
//             time : atletaTime,
//             posicao : atletaPosicao,
//             nome: atletaNome,
//             apelido: atletaApelido,
//             sobrenome: atletaSobrenome,
//             nascimento: atletaNascimento,
//             cpf: atletaCpf
//         }
//         // Inicia o vetor (array)
//         var atletas = []
//         // Adiciona objeto no array
//         atletas.push(atleta)
//         // Armazena no localStorage - JSON.stringify = converte o JavaScript em nota JSON
//         localStorage.setItem('Atletas', JSON.stringify(atletas))
//         location.reload();
//       } else {
//         // Define uma nova variável e coloca o conteúdo de localStorage nela - JSON.parse = converte a notação JSON em JavaScript
//         var atletas = JSON.parse(localStorage.getItem('Atletas'))
//         var verificarDisponibilidade;
//         for (var i = 0; i < atletas.length; i++) {
//           if (atletas[i].cpf == atletaCpf) {
//             verificarDisponibilidade = true;
//           }
//         }
//         if (verificarDisponibilidade == true) {
//           alert ('Atleta ja esta cadastrado');
//           verificarDisponibilidade = false;
//         } else {
//           //Cria o objeto
//           var atleta = {
//               id: gerarIDAtleta(),
//               time : atletaTime,
//               posicao : atletaPosicao,
//               nome: atletaNome,
//               apelido: atletaApelido,
//               sobrenome: atletaSobrenome,
//               nascimento: atletaNascimento,
//               cpf: atletaCpf
//           };
//           // Adiciona objeto no array
//           atletas.push(atleta);
//           // Re-armazena no localStorage - JSON.stringify = converte o JavaScript em nota JSON
//           localStorage.setItem('Atletas', JSON.stringify(atletas));
//           location.reload();
//         }
//       }
//
//       event.preventDefault();
//     });
//
//
//   function gerarIDAtleta() {
//     var id = JSON.parse(localStorage.getItem('idAtleta'))
//     if(id === null){
//       localStorage.setItem('idAtleta', 0);
//     } else {
//       id += 1
//       localStorage.setItem('idAtleta', id);
//     }
//     return JSON.parse(localStorage.getItem('idAtleta'));
//   }
//
//   // _____________________________________________________________
//
//   // $('#teste').click(function(){
//   //   alert ($('#nascimento').val());
//   // });
// })
