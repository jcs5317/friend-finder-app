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

    var formIsValid = $('#freindForm')[0].checkValidity();
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


    // // Form validation
    // function validateForm() {
    //     var isValid = true;
    //     $('.form-control').each(function () {
    //         if ($(this).val() === "")
    //             isValid = false;
    //     });
    //     $('.chosen-select').each(function () {
    //         if ($(this).val() === "")
    //             isValid = false
    //     })
    //     return isValid;
    // }
    // // If all required fields are filled
    // if (validateForm() == true) {
    //     // Create an object for the user's data
    //     var userData = {
    //         name: $("#name").val(),
    //         photo: $("#photo").val(),
    //         scores: [
    //             $("#q1").val(),
    //             $("#q2").val(),
    //             $("#q3").val(),
    //             $("#q4").val(),
    //             $("#q5").val(),
    //             $("#q6").val(),
    //             $("#q7").val(),
    //             $("#q8").val(),
    //             $("#q9").val(),
    //             $("#q10").val()
    //         ]
    //     }
    //     // Grab the URL of the website
    //     var currentURL = window.location.origin;
        
    //     // AJAX post the data to the friends API. 

    //     $.post(currentURL + "/api/friends", userData, function (data) {
    //         // AJAX to post so that the top matchs name and photo are displayed.
    //         $("#match-name").text(data.name);
    //         $('#match-img').attr("src", data.photo);
    //         // Show the modal with the top match 
    //         $("#results-modal").modal('toggle');
    //     });
    // }   
    // // } else {
    // //     alert("Please complete all selections before submitting!");
    // // }
    // //res.redirect("/") or
    
    // return false;
    // location.reload()
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