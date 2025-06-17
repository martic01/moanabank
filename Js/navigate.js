

function tostringed(inputed) {
    return inputed.toLocaleString()
}

$(document).ready(function () {
    $(".his").click(function () {
        $(".history").slideToggle()
    })

    $(".monbtn").click(function () {
        const account = bank.findAccount(accountId)
        const index = $('.monbtn').index(this)
        const clickedOn = $(this)
        const moneyClass = ['Withdraw', 'Deposit', 'Request', 'Transfer', 'Transfer', 'Deposit']
        $(".casf").slideDown()
        $('.monbtn').removeClass('acting')
        $("#amount").removeClass()
        moneyClass.forEach((item, i) => {
            if (i === index) {
                item === 'Withdraw' || item === 'Deposit' ?
                    $('.bankopt, .accountno').prop('disabled', true) :
                    $('.bankopt, .accountno').prop('disabled', false)

                $(".typejs").text(item)
                $("#amount").addClass(`.${item.toLowerCase()}`)
                if (item === moneyClass[0] || item === moneyClass[1]) {
                    $(`#${account.id}.bankopt option:eq(0)`).prop('selected', true);
                    $(`#${account.id}.accountno`).val(account.accountnumber)
                } else {
                    $(`#${account.id}.accountno`).val('')
                }
                $(".amount").prop('placeholder', `amount to ${item}`)
                clickedOn.addClass('acting')
            }
        })
    })

    $(".close").click(function () {
        $('.monbtn').removeClass('acting')
        $(".casf").fadeOut()
    })

    $(".close-alert").click(function () {
        $('.alerted').slideUp()
    })
    $(".opt").click(function () {
        $(".log").slideToggle()
        $(".profile-info").hide()
        $(".profile").removeClass('half')
    })

    $(".logout").click(function () {
        $(".accountpage").show()
        $('.monbtn').removeClass('acting')
        $(".profile").removeClass('half')
        $(".out").hide()
    })

    $(".profile").click(function () {
        $(".profile-info").slideToggle()
        $(".profile").toggleClass('half')

    })
    $(".cover").click(function () {
        $(".cover").removeClass("covered")
        $(this).addClass('covered')
    })
    $('.tab-btn').click(function () {
        const clicked = $(this)
        $('.tab-btn').removeClass('active')
        if (clicked.has('.active')) {
            clicked.toggleClass('active')
        }
    })

    $(".edit-icon").click(function () {
        $(".done-icon").show()
        $(".edit-icon").hide()
    })

    $(".done-icon").click(function () {
        $(".edit-icon").show()
        $(".done-icon").hide()
    })



    $("#showSignup").click(function () {
        $("#signupForm").show()
        $("#loginForm").hide()
    })

    $("#showLogin").click(function () {
        $("#signupForm").hide()
        $("#loginForm").show()
    })

    $(".eyes").click(function () {
        const clickOn = $(this)
        const inputOf = clickOn.closest('.input-group').find('input')
        const eyelid = clickOn.find('.eyelid')
        eyelid.toggleClass('opendeye');



        const currentType = inputOf.prop('type')
        inputOf.prop('type', currentType === 'password' ? 'text' : 'password')

    })
    $('.beye').click(function () {
        const $balanceInput = $(this).siblings('.balance');
        const $eyelid = $(this).find('.eyelid');
        const isOpening = !$eyelid.hasClass('opendeye');

        $eyelid.toggleClass('opendeye');

        if (isOpening) {
            // Opening eye - show formatted balance with 2 decimals
            const numericValue = parseFloat($balanceInput.data('original-value')) || parseFloat($balanceInput.val().replace(/,/g, ''));
            $balanceInput.val(parseFloat(numericValue.toFixed(2)).toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            }));
        } else {
            // Closing eye - store numeric value and show asterisks
            const currentValue = $balanceInput.val();
            $balanceInput.data('original-value',
                parseFloat(currentValue.replace(/,/g, '')) || parseFloat($balanceInput.val())
            );
            $balanceInput.val('*'.repeat(10));
        }
    });

    $("form").submit(function (e) {
        e.preventDefault()
    })

})