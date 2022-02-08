const output = document.getElementById("output");
const form = document.getElementById("form");
const arrival = document.getElementById("arrivalfield");
const departure = document.getElementById("departurefield");
const error = document.getElementById("error");


let template = "";

function validDates (arrivaldate, departuredate) {
    const arrival = new Date(arrivaldate);
    const departure = new Date(departuredate);
    if (arrival > departure) {
        return false;
    } else {
        return true;
    }
}

function calculateDays(arrivaldate, departuredate) {
    const arrival = new Date(arrivaldate);
    const departure = new Date(departuredate);
    const timediff = departure.getTime() - arrival.getTime();
    const diffindays = timediff / (1000 * 3600 * 24) + 1;
    return diffindays;
}

function calculatePrice(days, priceperday) {
    const totalprice = (495 + (priceperday * days)) * 1.25;
    return totalprice;
}

form.addEventListener("submit", function (e) {
    e.preventDefault();
    output.innerHTML = "";
    error.innerHTML = "";
    const datesValid = validDates(arrival.value, departure.value);
    console.log(datesValid)
    if (datesValid) {
        for (const car of carlist){
        const pnumber = parseFloat(document.getElementById("persons").value);
        const snumber = parseFloat(document.getElementById("suitcases").value);
        const days = calculateDays(arrival.value, departure.value);
        console.log(days)
        const price = calculatePrice(days, car.priceperday);

        if (car.persons >= pnumber && car.suitcases >= snumber) {
            template = `
            <div class="carcard">
            <img src="${car.image}" alt="car" class="carimg">
            <h2 class="h2">${car.name}</h2>
            <p class="text">${car.category} <br> Persons: ${car.persons} <br> Suitcases: ${car.suitcases} suitcases <br> ${car.comfort}</p>
            <h3 class="price">DKK ${price}</h3>
            <button class="button">Book now</button>
        </div>`

    output.insertAdjacentHTML ("beforeend", template)
        }

        }
        
    } else {
        error.innerHTML = "The day of departure must be later than the day of arrival";
    }
    
})

fetch("data.js")
