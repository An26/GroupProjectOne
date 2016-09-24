
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

$(document).ready(function() {
	addTodo();
});

function addTodo() {
	var userInput = $('.addTodo').val().trim();
	console.log(userInput);
};
