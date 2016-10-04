
var currentUserUID = null;

function getCurrentUserUID () {
    return currentUserUID;
}
function signIn(email, password) {

    firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(function(user){
        //console.log(uid);
        loginSuccess(user);
    })
    .catch(function(err){
        //console.error(err);
        updateUIAuthErr(createErr(err));
    });
}
function signUp(email, password) {
    firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then(function(user){
        //console.log(uid);
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
        //console.error(err);
        updateUIAuthErr(createErr(err));
    });    
}
function loginSuccess(user) {
    //console.log('loginSuccess');
    //console.log('uid: ' + user.uid);
    //console.log('Anonymous: ' + user.isAnonymous);
    //console.log('email: ' + user.email);

    currentUserUID = user.uid;
    updateUILogInSucess();
    // Trigger initial load
    addFBListenter('user');
}

function logOutSuccess() {
    //loginUser = null;
    valiseUser = null;
    toDoList = { list: []};
    currentUserUID = null;

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
//======================
// After further research, it seems Firebase save some credential info
// in localStorage. When the page is loaded, onAuthStateChanged()
// can trigger the initial load of such info. So removing anonymous sign in
// replace it with onAuthStateChanged
// index.html: Email/Password Sign in
// main.html: onAuthStateChanged to reLogin then sign out at the end
function reLogin () {
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          // User is signed in.
          //console.log('isAnonymous: ' + user.isAnonymous);
          //console.log('user.uid: ' + user.uid);
          currentUserUID = user.uid;
          addFBListenter('user');
          addFBListenter('toDoList');
          addTravelPlanFBListenters('flight');
          addTravelPlanFBListenters('lodging');
          addTravelPlanFBListenters('itinerary');

        } else {
        
            console.log({code: 'missing-uid', message: 'missing current user uid in local storage'});
        }
         // ...
    });
}

