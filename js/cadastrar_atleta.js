$ (document).ready(function(){
  $(".add").submit(function(event){
    upCase();
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

    obj.data = new Date();
    delete obj.undefined;
    console.log(obj);
    var keyAt = app.child(docName).push(obj).key;
    addInfo(docName, keyAt);
    addAtTime(time, keyAt);
    $('label').removeClass('active')
  }
});


$(document).ready(function(){
  $('select').material_select();
});

function addInfo(docName, atleta) {
  var informacoes = {
    jogos: 0,
    pts: 0,
    try: 0,
    conv: 0,
    drop: 0,
    penal: 0,
    amar: 0,
    verm: 0
  }
  app.child(docName +'/'+atleta+'/informacoes').update(informacoes);
}

function addAtTime(time, atleta) {
  var jogadores = {}
  jogadores[atleta] = true;
  app.child('times/' + time).child('jogadores').update(jogadores);
}

function upCase() {
  $("#nome").val().toUpperCase();
  $("#sobrenome").val().toUpperCase();
  $("#apelido").val().toUpperCase();
}
