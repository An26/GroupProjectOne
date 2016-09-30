

// click function that adds a strike through
//9/23 - unecessary because of Materialize

// $('.userInput').on('click', function() {

// 	if (this.id === 'activeTodo') {
// 		$(this).wrap('<del>').attr('id', 'unactiveTodo');
// 	} else if (this.id === 'unactiveTodo') {
// 		$(this).attr('id', 'activeTodo')
// 	}
// });

//pushing up new to-do on the form/list


    var toDoCount = 0;

    function addTodo() {
        var userInput = $('.addTodo').val().trim();
        console.log(userInput);
    };



    function addTask() {

        toDoCount++;

        var strikeThrough;

        var newTask = $("#addTodo").val().trim();

        var newDiv = $("<div class='toDoText'>");

        newDiv.html(newTask);

        var deleteButton = $("<button class='round-button'>").html("x");

        var task = $(newDiv).append(deleteButton);


        task.click(function() {


            if (strikeThrough) {

                strikeThrough = false;

            } else {

                strikeThrough = true;

            }

            if (strikeThrough) {
                $(this).addClass('strikeThrough');

            } else {


                $(this).removeClass('strikeThrough');

            }


        });

       

        $("#toDoForms").append(task);
        $("#addTodo").val("");

        $("#toDoCount").html(toDoCount + " to do");

    }



    $("#addTodo").on('keyup', function(event) {

        if (event.which === 13) {

            addTask();
        }
    });





	function removeTask(){

	$(".strikeThrough").remove();
}
 	
	var myTaskRemoval = setInterval(removeTask, 30000);



