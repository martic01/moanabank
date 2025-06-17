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

function Account(username, emailaddress, dateofbirth, nin, password, balance, accountnumber, bvn) {
    this.userName = username;
    this.emailAddress = emailaddress;
    this.dateOfBirth = dateofbirth;
    this.NIN = nin
    this.password = password;
    this.balance = balance;
    this.accountnumber = accountnumber
    this.transactions = []
    this.BVN = bvn || generateAccountNumber(); // Generate a random BVN if not provided
}



function generateAccountNumber() {
    return Math.floor(1000000000 + Math.random() * 9000000000)
}
function bvnNumber() {
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
const testAccounts = [
    new Account("Alice Smith", "alice@gmail.com", "12/08/1990", "98765432109", "alice1", 12000, 2000000001, "33445566778"),
    new Account("Bob Johnson", "bob@gmail.com", "03/11/1982", "45612378903", "bob4", 7500, 2000000002, "33445566778") // BVN will auto-generate
];

function createAccount(username, emailaddress, dateofbirth, nin, password, balance, accountnumber, bvn) {
    // Check for empty fields
    [username, emailaddress, dateofbirth, nin, password].forEach(function (input) {
        if (!input) {
            iserror = true;
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
        if (age < 16 || lenerror(password, 5, 8) || lenerror(nin, 11, 11) || lenerror(username, 3, 40)) {
            iserror = true;
        }


        // Check for duplicates by looping through accounts object
        iserror = false;
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
            accountnumber,
            bvn
        );


        bank.AddAcount(newAccount)

        alerting(".alerted", ".errormes", ".erroricon", "✅", "Account created successfully!");
        console.log(bank)



        // Show login form
        $('#showLogin').trigger('click');
    }
}
function showAccount(accountId) {
    const account = bank.findAccount(accountId);

    if (!account) {
        console.error("Account not found");
        return;
    }


 
  $('.balance')
    .attr('id', account.id)
    .val(
        parseFloat(account.balance)
            .toLocaleString('en-US', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            })
    );


    $('.name').attr('id', account.id);
    $('.name').each(function () {
        if ($(this).is('input, textarea, select')) {
            $(this).val(account.userName);
        } else {
            $(this).text(`Hello ${account.userName}`);
        }
    });
    $('.birth').attr('id', account.id).val(account.dateOfBirth);
    $('.emailed').attr('id', account.id).val(account.emailAddress);
    $('.accountnum, .accountno').attr('id', account.id).val(account.accountnumber);
    $('.nin').attr('id', account.id).val(account.NIN);
    $('.bvn').attr('id', account.id).val(account.BVN);
    $('.profile').attr('id', account.id);
    $('.logout').attr('id', account.id);
    $('.eye').attr('id', account.id);
    loadpage()

}

testAccounts.forEach(account => {
    bank.AddAcount(account);
});
 let accountId = null;
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
                showAccount(accountId);
            }, 1000);
        }
    }




    $('#signupforms').submit(function () {
        const username = $('#username').val().trim();
        const emailaddress = $('#emailaddress').val();
        const dateofbirth = $('#dateofbirth').val();
        const nin = $('#nin').val();
        const password = $('#password').val().trim();
        const balance = 0;
        const accountnumber = generateAccountNumber();
        const bvn = bvnNumber();
        createAccount(username, emailaddress, dateofbirth, nin, password, balance, accountnumber, bvn);
        // Clear form
        if (!iserror) {
            $('#username').val('');
            $('#emailaddress').val('');
            $('#dateofbirth').val('');
            $('#nin').val('');
            $('#password').val('');
        }

    });

    $('#loginforms').submit(function () {

        displayAccount()
        // console.log("Login successful. Account:", {
        //     id: accountId,          // The account ID (key in bank.Accounts)
        //     ...foundAccount          // All other account properties
        // });

        // Successful login

    });
});