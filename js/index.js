$('#anonimo').click(function(){
  window.location = 'view.html'
})


$('#entrar').click(function (){
  var email = $('#email').val();
  console.log(email);
  var password = $('#password').val();
  console.log(password);


  firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;

  });
      console.log(firebase.auth().currentUser);
})
