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
    new Account("Alice Smith", "alice@gmail.com", "12/08/1990", "98765432109", "lice1", 400000, 2000000001, "33445566778"),
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

function bindId(accountId) {
    const account = bank.findAccount(accountId);
    $('.balance').attr('id', account.id);
    $('.name').attr('id', account.id);
    $('.birth').attr('id', account.id)
    $('.emailed').attr('id', account.id)
    $('.accountnum, .accountno').attr('id', account.id)
    $('.nin').attr('id', account.id)
    $('.bvn').attr('id', account.id)
    $('.profile').attr('id', account.id);
    $('.logout').attr('id', account.id);
    $('.beye').attr('id', account.id);
    $('.bankopt').attr('id', account.id);
    $('.btnsmon').attr('id', account.id);
    $('.amount').attr('id', account.id);
    $('.history').attr('id', account.id);
    $('.typejs').attr('id', account.id);
}


function showAccount(accountId) {
    bindId(accountId);

    const account = bank.findAccount(accountId);
    if (!account) {
        return;
    }

    $(`#${account.id}.balance`)
        .val(
            parseFloat(account.balance)
                .toLocaleString('en-US', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                })
        );

    $(`#${account.id}.name`).each(function () {
        if ($(this).is(`input, textarea, select`)) {
            $(this).val(account.userName);
        } else {
            $(this).text(`Hello ${account.userName}`);
        }
    });
    $(`#${account.id}.birth`).val(account.dateOfBirth);
    $(`#${account.id}.emailed`).val(account.emailAddress);
    $(`#${account.id}.accountnum, #${account.id}.accountno`).val(account.accountnumber);
    $(`#${account.id}.nin`).val(account.NIN);
    $(`#${account.id}.bvn`).val(account.BVN);

    attachEventListeners()
}

function numericAmounts(amount) {
    let numericAmount;
    if (typeof amount === 'string') {
        numericAmount = Number(amount.split(',').join(''));
    } else {
        numericAmount = Number(amount);
    }
    return numericAmount
}

function validateAmount(accountId, amount) {
    let numericAmount = numericAmounts(amount)
    // Validate the amount
    if (isNaN(numericAmount)) {
        alerting(".alerted", ".errormes", ".erroricon", "👀", "Please enter a valid amount.");
        return;
    }

    const account = bank.findAccount(accountId);
    const balance = Number(account.balance);

    if (numericAmount > balance) {
        alerting(".alerted", ".errormes", ".erroricon", "🙄", "Insufficient funds.");
        return;
    } else if (numericAmount <= 200) {
        alerting(".alerted", ".errormes", ".erroricon", "🤨", "Amount must be greater than $200.");
        return;
    } else if (numericAmount > 300000) {
        alerting(".alerted", ".errormes", ".erroricon", "🤨", "Amount must be less than $300,000.");
        return;
    }

    return true

}

function htmltransaction(info1, action, actionclass, sign, amount) {
    const transact = `
        <div class="activity-item">
            <div class="activity-left">
                <div>
                    <div>${info1}</div>
                    <small>${action}</small>
                </div>
            </div>
            <div class="${actionclass}">${sign} $${amount.toLocaleString()}</div>
        </div>
     `
    return transact
}

function withdraw(accountId, amount) {
    validateAmount(accountId, amount)
    let numericAmount = numericAmounts(amount)
    const account = bank.findAccount(accountId);
    const balance = Number(account.balance);

    if (validateAmount(accountId, amount)) {
        const newBalance = balance - numericAmount;
        account.balance = newBalance;

        account.transactions.push(
            htmltransaction(account.userName, 'Debit', 'red', '-', numericAmount)
        );

        showAccount(accountId);
        loadpage(300, 10);
        alerting(".alerted", ".errormes", ".erroricon", "✅",
            `Withdrawal of $${numericAmount.toLocaleString()} successful!`);
    }
}

function deposit(accountId, amount) {
    validateAmount(accountId, amount)
    let numericAmount = numericAmounts(amount)
    const account = bank.findAccount(accountId);
    const balance = Number(account.balance);

    if (validateAmount(accountId, amount)) {
        const newBalance = balance + numericAmount;
        account.balance = newBalance;

        account.transactions.push(
            htmltransaction(account.userName, 'Credit', 'green', '+', numericAmount)
        );
        showAccount(accountId);
        loadpage(300, 10);
        alerting(".alerted", ".errormes", ".erroricon", "✅", `Deposite of $${numericAmount.toLocaleString()} successful!`);

    }
}
function displayTransactions(accountId) {
    const account = bank.findAccount(accountId)
    account.transactions.forEach(function (trans) {
        
    })
    
}
function attachEventListeners() {
    const account = bank.findAccount(accountId);

    $(`#${account.id}.btnsmon`).off('click').on('click', function () {
        const state = $(`#${account.id}.typejs`).text().trim();
        let amountInput = $(`#${account.id}.amount`).val().trim();

        // Remove commas if present
        if (amountInput.includes(',')) {
            amountInput = amountInput.split(',').join('');
        }

        const numericAmount = Number(amountInput);

        if (state === 'Withdraw') {
            withdraw(account.id, numericAmount);
        } else if (state === 'Deposit') {
            deposit(account.id, numericAmount);
        }

        // Clear input
        $(`#${account.id}.amount`).val('');
    });
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
                loadpage(7000, 2000)
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