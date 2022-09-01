class Card {
    constructor(name, numberCard, monthExpDate, yearExpDate, cvc) {
        this.name = name;
        this.numberCard = numberCard;
        this.monthExpDate = monthExpDate;
        this.yearExpDate = yearExpDate;
        this.cvc = cvc;
    }
}

const numberCardRegex = new RegExp(/(\d{4}[-. ]?){4}|\d{4}[-. ]?\d{6}[-. ]?\d{5}/);
const nameRegex = new RegExp(/^([a-zA-Z-']+\s)*[a-zA-Z-']+$/);

function validateName(x) { return nameRegex.test(x);};
function validateCard(x) {return numberCardRegex.test(x);};
function validateMonth(x) {return parseInt(x) > 0 && parseInt(x) <= 12;};
function validateYear(x) {return parseInt(x) > 22;};
function validateCvc(x) {return parseInt(x) > 99 && parseInt(x) < 1000;};


function updateName(x) {
    let updatedName = x.value;
    document.getElementById('error-name').innerText = '';
    if(validateName(updatedName)) {
        let nameCard = document.getElementById("cardholdername");
        nameCard.innerText = updatedName.toUpperCase();
    } else {
        document.getElementById('error-name').innerText = "Invalid Name";
    }
}



function updateCard(x) {
    let updatedCard = x.value;
    document.getElementById('error-cardnumber').innerText = '';
    let arr = updatedCard.replaceAll(" ","").split("");
    
    arr.splice(4,0," ");
    arr.splice(9,0," ");
    arr.splice(14,0," ");

    updatedCard = '';
    arr.forEach(x => {
        updatedCard += x;
    });
    updatedCard.trim();

    if(validateCard(updatedCard)) {
        document.getElementById('card-number').innerText = updatedCard;
    } else {
        if(updatedCard.length >= 16) {
            document.getElementById('error-cardnumber').innerText = 'Wrong format, only numbers!';
        } else {
            document.getElementById('error-cardnumber').innerText = 'Missing numbers!';
        }
    }
    document.getElementById('card-number').innerText = updatedCard;
}

function updateMonth(x) {
    let updatedMonth = x.value;
    document.getElementById('error-date').innerText = '';
    
    if(!validateMonth(updatedMonth)) {
        document.getElementById('error-date').innerText = 'Invalid Month!';
    }

    document.getElementById('expdate-month').innerText = updatedMonth;
}

function updateYear(x) {
    let updatedYear = x.value;
    document.getElementById('error-date').innerText = '';
    if(validateYear(updatedYear)) {
        document.getElementById('expdate-year').innerText = updatedYear;
    } else {
        document.getElementById('error-date').innerText = 'Invalid Date';
    }
}

function updateCvc(x) {
    let updatedCvc = x.value;
    document.getElementById('error-cvc').innerText = '';
    if(validateCvc(updatedCvc)) {
        document.getElementById('cvc').innerText = updatedCvc;
    } else {
        document.getElementById('error-cvc').innerText = 'Invalid CVC';
    }
}

function addCard() {
    const name = document.getElementById("form-cardholdername").value;
    const cardNumber = document.getElementById("card-number").textContent;
    const month = document.getElementById("form-month").value;
    const year = document.getElementById("form-year").value;
    const cvc = document.getElementById("form-cvc").value;

    const card = new Card(name, cardNumber, month, year, cvc);


    if(validateName(name) && validateCard(cardNumber) && validateMonth(month) && validateYear(year) && validateCvc(cvc)) {
        localStorage.setItem(`card ${localStorage.length}`, JSON.stringify(card));

        document.querySelector('form').style.display = 'none';
        document.getElementById('card-added').classList.toggle('card-added');
    } else {
        alert('Something Wrong!! Verify the fields again!!');
    }    
}