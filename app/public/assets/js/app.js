  // Chosen CSS
  var config = {
    '.chosen-select': {},
    '.chosen-select-deselect': {
        allow_single_deselect: true
    },
    '.chosen-select-no-single': {
        disable_search_threshold: 10
    },
    '.chosen-select-no-results': {
        no_results_text: 'Oops, nothing found!'
    },
    '.chosen-select-width': {
        width: "95%"
    }
};

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
    var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
        '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
    return !!pattern.test(str);
}
