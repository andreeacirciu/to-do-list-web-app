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
        }).done(function (response) {
            console.log('Success');
            console.log(response);

        }); //aici decalram ce sa se intample cand vine raspunsul de pe retea
    },

    bindEvents: function () {

        //callback functions o fuctie data ca parametru pentru o metoda executata asincron
        $('#create-task-form').submit(function () {

            ToDoList.createTask();
        });
    }

};

ToDoList.bindEvents();