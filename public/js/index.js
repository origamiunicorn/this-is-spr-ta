$(document).ready(function () {
    $(document).on("click", "#saveGameBtn", handleGameSubmit);
    $(document).on("click", ".deleteGameBtn", handleGameDelete);
});

var handleGameSubmit = function () {
    $("form[name='gamefrm']").submit(function (e) {
        e.preventDefault();
    }).validate({
        // Specify validation rules
        rules: {
            // The key name on the left side is the name attribute
            // of an input field. Validation rules are defined
            // on the right side
            charName: "required",
            clanName: "required"
        },
        // Specify validation error messages
        messages: {
            charName: "Please enter your character name<br />",
            clanName: "Please enter your clan name<br /><br />"
        },
        // Make sure the form is submitted to the destination defined
        // in the "action" attribute of the form when valid
        submitHandler: function (form) {
            var gameData = {
                charName: $('[name="charName"]').val(),
                clanName: $('[name="clanName"]:checked').val()
            }

            console.log(gameData);
            $.post("/api/game", gameData)
                .then(function () {
                    window.location.replace("/story/1");
                });
        }
    });
}

var handleGameDelete = function () {
    var id = $(this).attr("data-game-id");
    $.ajax({
        method: "DELETE",
        url: "/api/game/" + id
    })
        .then(function () {
            window.location.reload();
        });
}