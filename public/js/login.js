$(document).ready(function () {
    $(document).on("click", "#loginbtn", handleLogin);
});

// handleFormSubmit is called whenever we submit a new user
// Save the new example to the db and refresh the list
var handleLogin = function (event) {
    $("form[name='loginfrm']").submit(function (e) {
        e.preventDefault();
    }).validate({
        // Specify validation rules
        rules: {
            // The key name on the left side is the name attribute
            // of an input field. Validation rules are defined
            // on the right side
            inputEmail: {
                required: true,
                // Specify that email should be validated
                // by the built-in "email" rule
                email: true
            },
            inputPassword: {
                required: true,
                minlength: 5
            }
        },
        // Specify validation error messages
        messages: {
            inputEmail: "Please enter a valid email address<br />",
            inputPassword: {
                required: "Please enter a password<br />"
            }
        },
        // Make sure the form is submitted to the destination defined
        // in the "action" attribute of the form when valid
        submitHandler: function (form) {
            var email = $("#inputEmail").val();
            var password = $("#inputPassword").val();

            loginUser(email, password);
        }
    });
}

function loginUser(email, password) {
    $.post("/login", {
        email: email,
        password: password
    })
        .then(function () {
            window.location.replace("/dashboard");
            // If there's an error, log the error
        })
        .catch(function (err) {
            handleLoginErr(err.responseText);
        });
}

function handleLoginErr(err) {
    $("#alert_login .msg").html(err);
    $("#alert_login").fadeIn(500);
}
