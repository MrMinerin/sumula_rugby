$ (document).ready(function(){
  $(".add").submit(function(event){
    save($(this).attr("id"));
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
    for (let i = 0; i < selects.length; i++) {
      obj[selects.eq(i).attr('name')] = inputs.eq(i).val();
      selects.eq(i).val("");
    }
    obj.data = new Date();

    firebase.database().ref().child(docName).push(obj);

    $('label').removeClass('active')
  }
});
