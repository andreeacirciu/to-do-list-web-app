window.ToDoList = {

    API_URL: 'http://localhost:8081/tasks',

    createTask: function () {
        let descriptionValue = $('#description-field').val();
        let deadlineValue = $('#deadline-field').val();


        var requestBody = {
            description: descriptionValue,
            deadline: deadlineValue
        };

        $.ajax({

            url: ToDoList.API_URL,
            method: 'POST',
            contentType: 'application/json', //trimitem continut de tip json
            data: JSON.stringify(requestBody)  //informatia trimisa ceea ce scriam in postman
        }).done(function () {
            ToDoList.getTasks();
            //console.log(response);


        }); //aici decalaram ce sa se intample cand vine raspunsul de pe retea
    },

    getTasks: function () {
        $.ajax({
            url: ToDoList.API_URL,
        }).done(function (response) {
            ToDoList.displayTasks(JSON.parse(response));
        });
    },

    displayTasks: function (tasks) {
        let rowsHtml = ``;

        tasks.forEach(task => rowsHtml += ToDoList.getTaskRowHtml(task))

        $('#tasks-table tbody').html(rowsHtml);
    },

    getTaskRowHtml: function (task) {
        return ` <tr>
        <td> ${task.description}</td>
        <td>${task.deadline}</td>
        <td>
            <input type="checkbox" class="mark-done" data-id=${task.id}>
        </td>
        <td>
            <a href="#" class="remove-task" data-id = ${task.id}> <i class="fa fa-trash"></i> </a>
        </td>
    </tr>`

    },

    bindEvents: function () {

        //callback functions o functie data ca parametru pentru o metoda executata asincron
        $('#create-task-form').submit(function (event) {
            event.preventDefault();
            ToDoList.createTask();
        });
    }

};

ToDoList.getTasks();
ToDoList.bindEvents();