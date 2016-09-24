
function signIn(email, password) {
	firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(function(user){
        var uid = user.uid;
        console.log(uid);
        //loginUser = user;
        loginSuccess(user);
    })
    .catch(function(err){
        console.error(err);
        updateUIAuthErr(createErr(err));
    });
}
function signUp(email, password) {
	firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then(function(user){
        var uid = user.uid;
        console.log(uid);
        //loginUser = user;
        loginSuccess(user);
    })
    .catch(function(err){
        //console.error(err);
        updateUIAuthErr(createErr(err));
    });
}
function signOut() {

    firebase
    .auth()
    .signOut()
    .then(function(){
        logOutSuccess();
    }, function(err){
        console.error(err);
        updateUIAuthErr(createErr(err));
    });    
}
function loginSuccess(user) {
    console.log('loginSuccess');
    loginUser = user;
    // update UI
    updateUILogInSucess();
    //==========
    // Trigger initial load
    addFBListenter('/user/' + loginUser.uid, 'value', getUserValue);
    addFBListenter('/toDoList/' + loginUser.uid, 'value', getToDoListValue);

}
function logOutSuccess() {
    loginUser = null;
    valiseUser = null;
    toDoList = { list: []};
    updateUILogOutSucess();
}
function createErr(err) {
    var msg = err.message;
    if (err.code == 'auth/user-not-found') {
        msg += ' Or user is not created yet.';
    }
    return {
        code: err.code,
        message: msg
    };
}