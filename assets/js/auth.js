var localCredKey = 'valiseCurrentUser';
var currentUserUID = null;

function getCurrentUserUID () {
    return currentUserUID;
}
function signIn(email, password) {

    firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(function(user){
        //var uid = user.uid;
        //console.log(uid);
        //loginUser = user;
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
        //var uid = user.uid;
        //console.log(uid);
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
        //console.error(err);
        updateUIAuthErr(createErr(err));
    });    
}
function loginSuccess(user) {
    console.log('loginSuccess');
    //console.log('uid: ' + user.uid);
    //console.log('Anonymous: ' + user.isAnonymous);
    //console.log('email: ' + user.email);

    localStorage.setItem(localCredKey, user.uid);
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

    localStorage.removeItem(localCredKey);
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

function reLogin (morePage) {
    var uid = localStorage.getItem(localCredKey);
    if (uid) {
        currentUserUID = uid;
        anonymousSignIn(morePage, uid);
    } else {
        updateUIAuthErr({code: 'missing-uid', message: 'missing current user uid in local storage'});
    }
}
function anonymousSignIn(morePage, uid) {
    firebase
    .auth()
    .signInAnonymously()
    .then(function(user){
        updateUILogInSucess();
        // Trigger initial load.
        addFBListenter('user'); 
        //addFBListenter('toDoList');
        addTravelPlanFBListenters('flight');
        addTravelPlanFBListenters('lodging');
        addTravelPlanFBListenters('itinerary');
        if (morePage) {
            // if we need to do more
        }
    })
    .catch(function(error) {
        updateUIAuthErr(createErr(err));
    });
}