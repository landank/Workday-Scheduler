$('#currentDay').text(moment().format('dddd, MMM Do'));

var auditTasks = function() {
    $('.hour').each(function() {
        var taskTime = moment($(this).text(), 'h A');
        currentTime = moment().startOf('hour');

        if (taskTime < currentTime) {
            $(this).parent().addClass('bg-secondary');
        }

        else if (taskTime > currentTime) {
            $(this).parent().addClass('bg-danger');
        }

        else {
            $(this).parent().addClass('bg-success');
        }
    });
};
// add or edit content
$('.row').on('click', function() {
    var text = $(this)
    .text()
    .trim();

    // replace div element with a new textarea
    var textInput = $("<textarea>").addClass("form-control").val(text);
    $(this).replaceWith(textInput);

    // auto focus new element
    textInput.trigger("focus");
});
// unfocused text area
$('textarea').on('blur', function() {

    // textarea current value
    var text = $(this).val();
    console.log(text);

    // div elkement recreation
    var originalDiv = $("<div>")
    .addClass("row col-10")
    .text(text);

    // content to be replaced ion the text area
    $(this).replaceWith(originalDiv);
});

$('.saveBtn').on('click', function() {
    var taskText = $(this).parent().find('.row').text().trim();
    var taskTime = $(this).parent().find('.hour').text().trim();

    saveTasks(taskTime, taskText);
});
var savedTasks = [];
var saveTasks = function(taskTime, taskText) {
    savedTasks.push({time: taskTime, task: taskText});
    
    localStorage.setItem('tasks', JSON.stringify(savedTasks));
};
auditTasks();