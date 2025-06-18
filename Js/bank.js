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
    this.NIN = nin;
    this.password = password;
    this.balance = balance;
    this.accountnumber = accountnumber;
    this.BVN = bvnNumber()
    this.bankName = 'Fɭo₩Ca$h';
    this.transactions = []
}



function generateAccountNumber() {
    return Math.floor(1000000000 + Math.random() * 9000000000)
}
function bvnNumber() {
    return Math.floor(1000000000 + Math.random() * 9000000000)
}


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
    new Account("Alice Smith", "alice@gmail.com", "12/08/1990", "98765432109", "lice1", 400000, '2000000001', "33445566778"),
    new Account("Bob Johnson", "bob@gmail.com", "03/11/1982", "45612378903", "bob4", 7500, '2000000002', "33445566778") // BVN will auto-generate
];

function createAccount(username, emailaddress, dateofbirth, nin, password, balance, accountnumber) {
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
    $('.balance,.name,.birth,.emailed,.accountnum,.accountnumd, .accountno,.nin,.bvn,.profile,.logout,.beye,.eyelid,.bankopt,.btnsmon,.amount,.history,.typejs,.edit,.done,.named').attr('id', account.id);
}


function showAccount(accountId) {
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


    $(`#${account.id}.name`).val(account.userName);
    $(`#${account.id}.named`).text(`Hello ${account.userName}`);
    $(`#${account.id}.birth`).val(account.dateOfBirth);
    $(`#${account.id}.emailed`).val(account.emailAddress);
    $(`#${account.id}.accountnum`).val(account.accountnumber);
    $(`#${account.id}.accountnumd`).text(account.accountnumber);
    $(`#${account.id}.nin`).val(account.NIN);
    $(`#${account.id}.bvn`).val(account.BVN);
    displayTransactions(account.id)
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

function validateAmount(amount) {
    let numericAmount = numericAmounts(amount)
    // Validate the amount
    if (isNaN(numericAmount)) {
        alerting(".alerted", ".errormes", ".erroricon", "👀", "Please enter a valid amount.");
        return;
    }

    if (numericAmount <= 200) {
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
    validateAmount(amount)
    let numericAmount = numericAmounts(amount)
    const account = bank.findAccount(accountId);
    const balance = Number(account.balance);

    if (numericAmount > balance) {
        alerting(".alerted", ".errormes", ".erroricon", "🙄", "Insufficient funds.");
        return;
    }

    if (validateAmount(amount) && numericAmount < balance) {
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
    validateAmount(amount)
    let numericAmount = numericAmounts(amount)
    const account = bank.findAccount(accountId);
    const balance = Number(account.balance);

    if (validateAmount(amount)) {
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

function transfer(accountId, amount, recipientAccountNumber, bankname) {
    // 1. Validate amount format
    validateAmount(amount)

    const numericAmount = numericAmounts(amount);
    const senderAccount = bank.findAccount(accountId);
    // 3. Validate recipient account exists and isn't sender
    let recipientAccount = null;
    for (const accountId in bank.Accounts) {
        if (bank.Accounts[accountId].accountnumber === recipientAccountNumber) {
            recipientAccount = bank.Accounts[accountId];
            break;
        }
    }

    if (!recipientAccount) {
        alerting(".alerted", ".errormes", ".erroricon", "⚠", "Recipient account not found");
        return false;
    }

    if (recipientAccount.bankName !== bankname) {
        alerting(".alerted", ".errormes", ".erroricon", "🏪❌", "Wrong Bank");
        return false;
    }

    if (recipientAccount.accountnumber === senderAccount.accountnumber) {
        alerting(".alerted", ".errormes", ".erroricon", "🙅", "Cannot transfer to yourself");
        return false;
    }

    // 4. Check sufficient balance
    if (Number(senderAccount.balance) < numericAmount) {
        alerting(".alerted", ".errormes", ".erroricon", "🙄", "Insufficient funds");
        return false;
    }

    // 5. PROCESS TRANSFER
    // Update balances
    senderAccount.balance = (Number(senderAccount.balance) - numericAmount).toFixed(2);
    recipientAccount.balance = (Number(recipientAccount.balance) + numericAmount).toFixed(2);

    // Record transactions
    const senderNote = `Transfer to ${recipientAccount.userName}`;
    const recipientNote = `Received from ${senderAccount.userName}`;

    senderAccount.transactions.push(
        htmltransaction(senderNote, 'Transfer', 'red', '-', numericAmount)
    );

    recipientAccount.transactions.push(
        htmltransaction(recipientNote, 'Deposit', 'green', '+', numericAmount)
    );

    // 6. Update UI
    showAccount(accountId); // Refresh sender view
    alerting(".alerted", ".errormes", ".erroricon", "✅",
        `Transferred $${numericAmount.toLocaleString()} to ${recipientAccount.userName}`);
    return true;
}

function displayTransactions(accountId) {
    const account = bank.findAccount(accountId)
    $('.trans').empty()
    account.transactions.forEach(function (trans) {
        $('.trans').prepend(trans)
    })
}


function attachEventListeners() {
    const account = bank.findAccount(accountId);
    $(`#${account.id}.btnsmon`).off('click').on('click', function () {

        const state = $(`#${account.id}.typejs`).text().trim();
        let amountInput = $(`#${account.id}.amount`).val().trim();
        let accountInput = $(`#${account.id}.accountno`).val().trim();
        let accountBankName = $(`#${account.id}.bankopt`).val();

        // Remove commas if present
        if (amountInput.includes(',')) {
            amountInput = amountInput.split(',').join('');
        }

        const numericAmount = Number(amountInput);

        if (state === 'Withdraw') {
            withdraw(account.id, numericAmount);
        } else if (state === 'Deposit' || state === 'Request') {
            deposit(account.id, numericAmount);
        } else if (state === 'Transfer') {
            transfer(account.id, numericAmount, accountInput, accountBankName)
        }

        // Clear input
        $(`#${account.id}.amount`).val('');
        $(`#${account.id}.accountno`).val('')
    });

    $(`#${account.id}.beye`).off('click').on('click', function () {
        const account = bank.findAccount(accountId);
        const $balanceInput = $(this).siblings('.balance');
        const $eyelid = $(this).find('.eyelid');
        const isOpening = !$eyelid.hasClass('opendeye');

        $eyelid.toggleClass('opendeye');

        if (isOpening) {
            // Restore the properly formatted value

            $balanceInput.val(
                parseFloat(account.balance).toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                })
            );
        } else {
            // Just hide the value - no need to store since we'll regenerate it
            $balanceInput.val('**********');
        };
    });

    // Edit Button Click Handler
    $(`#${account.id}.edit`).off('click').on('click', function () {
        const $editButton = $(this);
        const $doneButton = $editButton.siblings('.done');
        const index = $('.edit').index(this);
        const fields = ['name', 'birth', 'emailed'];

        fields.forEach((field, i) => {
            const $field = $(`#${account.id}.${field}`);

            // Convert birth field to date input when editing


            if (i === index) {
                $field.prop('readonly', false)
                    .focus();
                $doneButton.show();
                $editButton.hide();
            } else {
                $field.prop('readonly', true);
            }

            if (field === fields[1] && i === index) {
                $field.prop('readonly', false)
                    .prop('type', 'date');
            }
        });

        // Hide other edit buttons
        $(`#${account.id}.edit`).not(this).hide();
    });

    // Done Button Click Handler
    $(`#${account.id}.done`).off('click').on('click', function () {
        const $doneButton = $(this);
        const $editButton = $doneButton.siblings('.edit');
        const input = $doneButton.siblings(`input`)
        const index = $('.done').index(this);
        // Get input fields
        const $name = $(`#${account.id}.name`);
        const $email = $(`#${account.id}.emailed`);
        const $birth = $(`#${account.id}.birth`);


        checkEditName($name.val())
        checkEditBirth($birth.val())
        checkEditEmail($email.val())

        // Directly update the account object

        switch (index) {
            case 0: // Name
                if (!checkEditName($name.val())) {
                    account.userName = $name.val();
                    $name.val(account.userName);
                }
                break;
            case 1: // Email
                if (!checkEditBirth($birth.val())) {
                    $birth.prop('type', 'text');
                    account.dateOfBirth = $birth.val().trim();
                    $birth.val(account.dateOfBirth);
                }
                break;
            case 2:
                if (!checkEditEmail($email.val())) {
                    account.emailAddress = $email.val().trim();
                    $email.val(account.emailAddress);
                }
                break;
        }

        if (!checkEditName($name.val()) && !checkEditBirth($birth.val()) && !checkEditEmail($email.val())) {
            input.prop('readonly', true);
            $doneButton.hide();
            $editButton.show();

            // Show all edit buttons again
            $(`#${account.id}.edit`).show();
        }
        console.log('Updated account:', account);

    });

};

let accountId = null;

testAccounts.forEach(account => {
    bank.AddAcount(account);
});





