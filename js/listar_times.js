
var list = $('.list-time');
for (var i = 0; i < list.length; i++) {
  listAll(list.eq(i));


  function listAll(list) {
    console.log(list);
    console.log('listando');
    app.child('times').once('value', function (snapshot) {
      if (snapshot == undefined || snapshot == null) {
        var option = document.createElement('option');
        option.append(document.createTextNode('Nenhum time encontrado'));
        list.append(option);
        c();
      } else {

        snapshot.forEach(function (item) {
          var option = document.createElement('option');
          option.value = item.key;

          option.append(document.createTextNode(item.val().nome));

          list.append(option);

          c();

        });
      }
    });
  }
}


var c = function (){
  $(document).ready(function (){
    $(".dropdown-button").dropdown();
  });
  $(document).ready(function(){
    $('select').material_select();
  });
}
