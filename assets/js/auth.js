
function signIn(email, password) {
	firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(function(user){
        var uid = user.uid;
        //console.log(uid);
        loginUser = user;
        updateUISignInSuccess();
    })
    .catch(function(err){
        //console.error(err);
        updateUIAuthErr(err);
    });
}
function signUp(email, password) {
	firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then(function(user){
        var uid = user.uid;
        //console.log(uid);
        loginUser = user;
        updateUISignUpSuccess();
    })
    .catch(function(err){
        //console.error(err);
        updateUIAuthErr(err);
    });
}
function signOut() {
    firebase
    .auth()
    .signOut()
    .then(function(){
        updateUISignOutSuccess();
    }, function(err){
        //console.error(err);
        updateUIAuthErr(err);
    });    
}