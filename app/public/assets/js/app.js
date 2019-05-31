// Capture the form inputs 
$("#submit").on("click", function () {
    event.preventDefault();

    var formIsValid = $('#friendForm')[0].checkValidity();
    console.log(formIsValid)
    var img = $("#photo").val().trim();
    var urlIsValid = validURL(img);

    if(formIsValid && urlIsValid) {
        var newFriend = {
            name: $("#name").val().trim(),
            photo: img,
            scores: []
        }

        $('select.chosen-select').each(function(i, elem){
            newFriend.scores.push(parseInt(elem.value))
            elem.value = "";
        });

        $("#name, #photo").val('');

        // console.log(newFriend)
        $.post('/api/friends', newFriend, function(data){
            $("#match-name, #match-img").empty();

            $("#match-name").text(data.name);
            $('#match-img').attr("src", data.photo);

            // Show the modal with the top match 
            $("#results-modal").modal('toggle');
        });

    } else {
        return alert('check the form and try again!')
    }

});

function validURL(str) {
    var pattern = new RegExp(/^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,}))\.?)(?::\d{2,5})?(?:[/?#]\S*)?$/i
); // fragment locator
    return !!pattern.test(str);
}
