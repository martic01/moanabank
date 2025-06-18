$(document).ready(function () {

    function displayAccount() {
        const loginemailaddress = $('#loginemailaddress').val();
        const loginPassword = $('#loginpassword').val();

        // Check for empty fields
        if (!loginemailaddress || !loginPassword) {
            alerting(".alerted", ".errormes", ".erroricon", "⚠", "Please fill in all fields.");
            return;
        }

        let foundAccount = null;


        if (!gmailerror(loginemailaddress)) {
            // Loop through all accounts to find matching email
            for (const id in bank.Accounts) {
                const account = bank.findAccount(id); // Using your existing method
                if (account && account.emailAddress.toLowerCase() === loginemailaddress.toLowerCase()) {
                    foundAccount = account;
                    accountId = id; // Store the account ID
                    break;
                }
            }


            if (!foundAccount) {
                alerting(".alerted", ".errormes", ".erroricon", "⭕", "Account Does not Exist");
                return;
            }
            if (foundAccount.password !== loginPassword) {
                alerting(".alerted", ".errormes", ".erroricon", "❌", "Incorrect password.");
                return;
            }

            alerting(".alerted", ".errormes", ".erroricon", "👍", "Login successful!");
            setTimeout(() => {
                loadpage(7000, 2000)
                bindId(accountId);
                showAccount(accountId);
            }, 1000);
        }
    }




    $('#signupforms').submit(function () {
        let eye = $(this).find('.eyes')
        const username = $('#username').val().trim();
        const emailaddress = $('#emailaddress').val();
        const dateofbirth = $('#dateofbirth').val();
        const nin = $('#nin').val();
        const password = $('#password').val().trim();
        const balance = 0;
        const accountnumber = generateAccountNumber().toString();
        const bvn = bvnNumber();

        const duplicateField = checkDuplicate(username, emailaddress);

        if (duplicateField) {
            alerting(".alerted", ".errormes", ".erroricon", "⚠", `${duplicateField} already exists`);
            return;
        }
        createAccount(username, emailaddress, dateofbirth, nin, password, balance, accountnumber, bvn);
        // Clear form
        if (!iserror) {
            if (eye.has('.opendeye')) {
                eye.trigger('click')
            }
            $('#username').val('');
            $('#emailaddress').val('');
            $('#dateofbirth').val('');
            $('#nin').val('');
            $('#password').val('');
        }

    });


    $('#loginforms').submit(function () {
        let eye = $(this).find('.eyes')
        displayAccount()
        if (!iserror) {
            if (eye.has('.opendeye')) {
                eye.trigger('click')
            }
            if (eye.has('.opendeye')) {
                eye.trigger('click')
            }
            $('#loginemailaddress').val('');
            $('#loginpassword').val('');

        }


    });

      $(".logout").click(function () {
        accountId = null
        $(".accountpage").show()
        $('.monbtn').removeClass('acting')
        $(".profile").removeClass('half')
        $(".out").hide()
        iserror = true;
    })
});