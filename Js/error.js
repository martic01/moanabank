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

function isAlphabetic(input) {
    for (const char of input) {
        if (!/[a-zA-Z]/.test(char)) {
            return false;
        }
    }
    return true;
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
    const requiredEnd = "@gmail.com";
    const symbolRegex = /[!#$%^&*(),?":{}|<>]/;

    if (!email.endsWith(requiredEnd)) {
        return `Email must end with ${requiredEnd}`;
    }

    const firstChar = email.charAt(0);
    if (!/[a-zA-Z]/.test(firstChar)) {
        return "First character must be a letter";
    }

    if (symbolRegex.test(email)) {
        return "Email must not contain symbols (!#$%^&*, etc.)";
    }

    const username = email.slice(0, -10);
    if (!/^[a-zA-Z0-9.]+$/.test(username)) {
        return "Email can only contain letters, numbers, and dots (.) before @gmail.com";
    }

    const len = lenerror(email, 13, 24);
    if (len) {
        return "Email must be between 13 to 24 characters long";
    }

    return "";
}

function checkEditName(input) {
    if (!/^[a-zA-Z]+(?: [a-zA-Z]+)*$/.test(input)) {
        return "Username can only contain letters and single spaces between words";
    }
    if (lenerror(input, 3, 40)) {
        return "Username must be 3-40 characters";
    }
    return "";
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
        const emailError = gmailerror(email)

        if (!containsLettersAndNumbers(password) || lenerror(password, 5, 8) || emailError || emailError) {
            iserror = true;
        }

        if (!containsLettersAndNumbers(password)) {
            alerting(".alerted", ".errormes", ".erroricon", "❌", "Password must contain both letters and numbers.");
            return;
        }
        if (lenerror(password, 5, 8)) {
            alerting(".alerted", ".errormes", ".erroricon", "👀", "Password length is invalid | Password must be between 5 to 8 characters long");
            return;
        }

        if (emailError) {
            alerting(".alerted", ".errormes", ".erroricon", "👀", `Email unaccepted | ${emailError}`);
            return;
        }

    });




});