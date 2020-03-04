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

for (var selector in config) {
    $(selector).chosen(config[selector]);
}

$("#submit").on("click", function() {

    function validateForm() {
        var isValid = true;
        $('.link').each(function() {
            var isLink = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/
            if (isLink.test($(this).val()) == false) {
                isValid = false;
                alert("Not a valid URL");
            }
        });
        $('.form-control').each(function() {
            if ($(this).val() === '')
                isValid = false;
        });
        $('.chosen-select').each(function() {
            if ($(this).val() === "")
                isValid = false
        })
        return isValid;
    }

    if (validateForm() == true) {
     
        var userData = {
                name: $("#name").val(),
                photo: $("#photo").val(),
                scores: [$("#q1").val(), $("#q2").val(), $("#q3").val(), $("#q4").val(), $("#q5").val(), $("#q6").val(), $("#q7").val(), $("#q8").val(), $("#q9").val(), $("#q10").val(), ]
            }
      
        var currentURL = window.location.origin;
  
        $.post(currentURL + "/api/friends", userData, function(data) {
       
            $("#matchName").text(data.name);
            $('#matchImg').attr("src", data.photo);
      
            $("#resultsModal").modal('toggle');
        });
    } else {
        alert("Please fill out all fields before submitting!");
    }

    return false;
});