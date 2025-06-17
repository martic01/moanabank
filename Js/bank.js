function Bank() {
    this.Accounts = {}
    this.userId;
}

Bank.prototype.AcctId = function () {
    this.userId = generateAccountNumber();
    return this.userId;
}

Bank.prototype.AddAcount = function (account) {
    account.id = this.AcctId();
    this.Accounts[account.id] = account;
}

Bank.prototype.findAccount = function (id) {
    if (this.Accounts[id] !== undefined) {
        return this.Accounts[id];
    }
    return false;
}

function Account(username, emailaddress, dateofbirth, nin, password, balance, accountnumber) {
    this.userName = username;
    this.emailAddress = emailaddress;
    this.dateOfBirth = dateofbirth;
    this.NIN = nin
    this.password = password;
    this.balance = balance;
    this.accountnumber = accountnumber
    this.transactions = []
}

function generateAccountNumber() {
    return Math.floor(1000000000 + Math.random() * 9000000000)
}

Account.prototype.addTransaction = function () {

};

function calculateAge(birthDate) {
    const today = new Date();
    const birthDateObj = new Date(birthDate);
    let age = today.getFullYear() - birthDateObj.getFullYear();
    const monthDiff = today.getMonth() - birthDateObj.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDateObj.getDate())) {
        age--;
    }
    return age;
}

const bank = new Bank()

$(document).ready(function () {
    $('#signupforms').submit(function () {
        const username = $('#username').val().trim();
        const emailaddress = $('#emailaddress').val();
        const dateofbirth = $('#dateofbirth').val();
        const nin = $('#nin').val();
        const password = $('#password').val().trim();
        const balance = 0;
        const accountnumber = generateAccountNumber();

        // Check for empty fields
        [username, emailaddress, dateofbirth, nin, password].forEach(function (input) {
            if (!input) {
                alerting(".alerted", ".errormes", ".erroricon", "⚠", "Please fill in all fields.");
                return;
            }
        });

        if (username && emailaddress && dateofbirth && nin && password &&
            containsLettersAndNumbers(password) && !gmailerror(emailaddress)) {

            const age = calculateAge(dateofbirth);
            if (age < 16) {
                alerting(".alerted", ".errormes", ".erroricon", "👀", "You must be at least 16 years old to create an account.");
                return;
            }
            if (lenerror(password, 5, 8)) {
                alerting(".alerted", ".errormes", ".erroricon", "👀", "Password must be 5-8 characters");
                return;
            }
            if (lenerror(nin, 11, 11)) {
                alerting(".alerted", ".errormes", ".erroricon", "👀", "NIN must be 11 characters");
                return;
            }
            if (lenerror(username, 3, 40)) {
                alerting(".alerted", ".errormes", ".erroricon", "👀", "Username must be 3-40 characters");
                return;
            }

            // Check for duplicates by looping through accounts object
            let isDuplicate = false;
            let duplicateField = "";

            for (const accountnumber in bank.Accounts) {
                if (bank.Accounts.hasOwnProperty(accountnumber)) {
                    const account = bank.Accounts[accountnumber];
                    if (account.userName.toLowerCase() === username.toLowerCase()) {
                        isDuplicate = true;
                        duplicateField = "Username";
                        break;
                    }
                    if (account.emailAddress.toLowerCase() === emailaddress.toLowerCase()) {
                        isDuplicate = true;
                        duplicateField = "Email";
                        break;
                    }

                    if (account.NIN === nin) {
                        isDuplicate = true;
                        duplicateField = "NIN";
                        break;
                    }

                }
            }

            if (isDuplicate) {
                alerting(".alerted", ".errormes", ".erroricon", "⚠", `${duplicateField} already exists`);
                return;
            }

            const newAccount = new Account(
                username,
                emailaddress,
                dateofbirth,
                nin,
                password,
                balance,
                accountnumber
            );


            bank.AddAcount(newAccount)

            console.log(bank);
            alerting(".alerted", ".errormes", ".erroricon", "✅", "Account created successfully!");

            // Clear form
            $('#username').val('');
            $('#emailaddress').val('');
            $('#dateofbirth').val('');
            $('#nin').val('');
            $('#password').val('');

            // Show login form
            $('#showLogin').trigger('click');
        }
    });

    $('#loginforms').submit(function () {
        const loginemailaddress = $('#loginemailaddress').val().trim();
        const loginPassword = $('#loginpassword').val().trim();

        // Check for empty fields
        if (!loginemailaddress || !loginPassword) {
            alerting(".alerted", ".errormes", ".erroricon", "⚠", "Please fill in all fields.");
            return;
        }

        let foundAccount = null;
        let accountId = null;

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
                loadpage()
            }, 1000);
        }
        // console.log("Login successful. Account:", {
        //     id: accountId,          // The account ID (key in bank.Accounts)
        //     ...foundAccount          // All other account properties
        // });

        // Successful login

    });
});