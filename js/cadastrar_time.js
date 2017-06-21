$ (document).ready(function(){
  $(".add").submit(function(event){
    save($(this).attr("id"));
    event.preventDefault();
  });


  function save(docName){
    var elementos = $('#' + docName + ' input, select');
    var obj = {}

    for (let i = 0; i < elementos.length; i++) {
      obj[elementos.eq(i).attr('name')] = elementos.eq(i).val();
      elementos.eq(i).val("");
    }
    obj.data = new Date();
    delete obj.undefined;
    firebase.database().ref().child(docName).push(obj);

    $('label').removeClass('active')
  }
});
