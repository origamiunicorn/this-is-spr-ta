$(document).ready(function () {
    $(document).on("click", "#savebtn", handleFormSubmit);
});

// The API object contains methods for each kind of request we'll make
var API = {
    saveUser: function (user) {
        return $.ajax({
            headers: {
                "Content-Type": "application/json"
            },
            type: "POST",
            url: "api/user",
            data: JSON.stringify(user)
        });
    },
    getUser: function () {
        return $.ajax({
            url: "api/user",
            type: "GET"
        });
    },
    deleteExample: function (id) {
        return $.ajax({
            url: "api/examples/" + id,
            type: "DELETE"
        });
    }
};

// handleFormSubmit is called whenever we submit a new user
// Save the new example to the db and refresh the list
var handleFormSubmit = function (event) {
    // Initialize form validation on the registration form.
    // It has the name attribute "registration"
    $("form[name='signupfrm']").submit(function (e) {
        e.preventDefault();
    }).validate({
        // Specify validation rules
        rules: {
            // The key name on the left side is the name attribute
            // of an input field. Validation rules are defined
            // on the right side
            name: "required",
            email: {
                required: true,
                // Specify that email should be validated
                // by the built-in "email" rule
                email: true
            },
            psw: {
                required: true,
                minlength: 5
            },
            psw_repeat: {
                minlength: 5,
                equalTo: "#psw"
            }
        },
        // Specify validation error messages
        messages: {
            name: "Please enter your name<br />",
            email: "Please enter a valid email address<br />",
            psw: {
                required: "Please enter a password<br />",
                minlength: "Your password must be at least 5 characters long<br />"
            }
        },
        // Make sure the form is submitted to the destination defined
        // in the "action" attribute of the form when valid
        submitHandler: function (form) {
            var userObj = {
                name: $("#name").val(),
                email: $("#email").val(),
                password: $("#psw").val()
            }

            API.saveUser(userObj).then(function (data) {
                if (data.error) {
                    handleLoginErr(data.error.errors[0].message);
                } else {
                    $("form[name='signupfrm']").trigger("reset");
                    window.location.replace("/dashboard");
                }
            });
        }
    });
}

function handleLoginErr(err) {
    $("#alert_signup .msg").text(err);
    $("#alert_signup").fadeIn(500);
}