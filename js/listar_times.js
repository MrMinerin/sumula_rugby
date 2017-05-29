
  var list = $('.list-time');
  for (var i = 0; i < list.length; i++) {
    listAll(list[i]);


  function listAll(list) {
    console.log('listando');
    firebase.database().ref('times').on('value', function (snapshot) {

      console.log('teste');
      snapshot.forEach(function (item) {
        var option = document.createElement('option');
        option.value = item.key;

        option.appendChild(document.createTextNode(item.val().nome));

        list.appendChild(option);
        c();


      });
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
