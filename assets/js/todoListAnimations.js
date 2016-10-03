
var myTaskRemoval = null;

function addTask(item) {
    var strikeThrough;
    var newDiv = $('<div>').addClass('toDoText');
    newDiv.html(item);
    var deleteButton = $("<button class='round-button toDoTextBtn'>").html("x");
    var task = $(newDiv).append(deleteButton);
 
    $("#toDoForms").append(task);
}
function updateUIGetToDoListValue(list) {


    $("#toDoForms").empty();
    list.forEach(function (item) {
        addTask(item);
    });
    if (list.length == 0) {
        $("#toDoCount").html('');
    } else {
        $("#toDoCount").html(list.length);   
    }
    
    if (myTaskRemoval == null) {
        //console.log('setInterval: removeTask');
        myTaskRemoval = setInterval(removeTask, 15000);
    }
}

function removeTask(){
    var preLength = getValiseToDoList().length;
    if (preLength == 0) return;
    $(".toDoText").each(function (i) {
        if ($(this).hasClass('strikeThrough')) {
            setValiseToDoList(i, 'undefined');
        }
    });

    filterValiseToDoList('undefined');
    var postLength = getValiseToDoList().length;
    if (postLength < preLength) {
        $('.strikeThrough').remove();
        setFBList();
    }
}
// Listeners
function enterAddToDo(event) {
    if (event.which === 13) {
        var newTask = $("#addTodo").val().trim();

        addValiseToDoList(newTask);
        $("#addTodo").val("");
        setFBList();
    }   
}

function clickToDoTextBtn() {
    //console.log('clickToDoTextBtn');
    $(this).parent().toggleClass('strikeThrough');
}



