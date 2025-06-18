let timeouted;
let iserror = true;

function containsLettersAndNumbers(password) {
    const letterRegex = /[a-zA-Z]/;
    const numberRegex = /[0-9]/;
    return letterRegex.test(password) && numberRegex.test(password);
}
function lenerror(active, numL, numH) {
    const low = active.length < numL
    const high = active.length > numH
    if (high || low) {
        return true
    }
    return false
}



function alerting(className, errorSpace, erroricon, icon, message) {
    $(className).find(errorSpace).text(message);
    $(className).find(erroricon).text(icon);
    $(className).show();
    timeouted = setTimeout(function () {
        $(className).fadeOut();
    }, 3000);
}
function gmailerror(email) {
    const emailEnd = email.slice(-10)
    const emailEndinput = '@gmail.com';
    if (emailEnd.match(emailEndinput)) {
        return false
    }
    return true
}

function checkEditName(input) {
    if (lenerror(input, 3, 40)) {
        alerting(".alerted", ".errormes", ".erroricon", "👀", "Username must be 3-40 characters");
        return true
    }
    return false
}
function checkEditEmail(input) {
    if (gmailerror(input)) {
        alerting(".alerted", ".errormes", ".erroricon", "👀", "Email unaccepted | Email must contain @gmail.com");
        return true
    }
    return false
}

function checkEditBirth(input) {
    const age = calculateAge(input);
    if (age < 16) {
        alerting(".alerted", ".errormes", ".erroricon", "👀", "You must be at least 16 years old.");
        return true
    }
    return false
}


$(document).ready(function () {

    $(".password").on("input", function () {
        const password = $(this).val().trim();
        const warn = $(this).closest('form').find('.warn');
        const eyelid = $(this).siblings('.eye').find('.eyelid');
        const pupil = $(this).siblings('.eye').find('.pubdy');
        if (!password) {
            eyelid.removeClass('erroreye');
            pupil.removeClass('errorpupil');
        } else {
            if (!containsLettersAndNumbers(password) && password.length > 4) {
                alerting(".alerted", ".errormes", ".erroricon", "❌", "Password must contain both letters and numbers.");
                eyelid.addClass('erroreye');
                pupil.addClass('errorpupil');
                warn.removeClass('strong');
            } else if (lenerror(password, 5, 8)) {
                eyelid.addClass('erroreye');
                pupil.addClass('errorpupil');
                warn.removeClass('strong');
            } else {
                clearTimeout(timeouted);
                $(".alerted").fadeOut();
                eyelid.removeClass('erroreye');
                pupil.removeClass('errorpupil');
                warn.addClass('strong');
            }
        }
    });



    $("form").submit(function (e) {
        e.preventDefault();
        const password = $(this).find('.password').val().trim();
        const email = $(this).find('.email').val().trim();
        if (!containsLettersAndNumbers(password)) {
            alerting(".alerted", ".errormes", ".erroricon", "❌", "Password must contain both letters and numbers.");
        }
        if (lenerror(password, 5, 8)) {
            alerting(".alerted", ".errormes", ".erroricon", "👀", "Password length is invalid | Password must be between 5 to 8 characters long");
        }
        if (gmailerror(email)) {
            alerting(".alerted", ".errormes", ".erroricon", "👀", "Email unaccepted | Email must contain @gmail.com");
        }
        if (!containsLettersAndNumbers(password) || lenerror(password, 5, 8) || gmailerror(email)) {
            iserror = true;
        }
    });




});