const today = new Date();
const year_month = document.getElementById("year_month");
const date_day = document.getElementById("date_day");
const dayOfWeek = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"];
const prev = document.getElementById("prev");
const post = document.getElementById("post");
const days = document.getElementsByClassName("days");
const container = document.getElementById("container");
const details = document.getElementById("details");
const selectedDate = document.getElementById("selectedDate");
const CURRENT_YEAR = today.getFullYear();
const CURRENT_MONTH = today.getMonth() + 1;
const CURRENT_DAY = dayOfWeek[today.getDay()];
const CURRENT_DATE = today.getDate();

let year = CURRENT_YEAR;
let month = CURRENT_MONTH;
let day = CURRENT_DAY;
let date = CURRENT_DATE;

let frontOrBack = true;
console.log(`year : ${year}, month : ${month}, day : ${day}, date : ${date}`);

function flip(event){
    if(frontOrBack){
        const clickedDate = event.target.innerText;
        container.classList.add("flipped");
        details.classList.remove("flipped");
        showDetails(clickedDate);
    }else{
        container.classList.remove("flipped");
        details.classList.add("flipped");
    }
    frontOrBack=!frontOrBack;
}
function showDetails(clickedDate) {
    console.log(clickedDate);
    selectedDate.innerText=`${year}년 ${month}월 ${clickedDate}일`
}
function currentCheck() {
    return (CURRENT_YEAR == year && CURRENT_MONTH == month) ? true : false;
}
prev.addEventListener("click", function () {
    month--;
    if (month < 1) {
        month = 12;
        year--;
    }
    if (currentCheck()) {
        date_day.classList.remove("hidden");
        year_month.classList.remove("padded");
    } else {
        year_month.classList.add("padded");
        date_day.classList.add("hidden");
    }
    init();
});
post.addEventListener("click", function () {
    month++;
    if (month > 12) {
        month = 1;
        year++;
    }
    if (currentCheck()) {
        date_day.classList.remove("hidden");
        year_month.classList.remove("padded");
    } else {
        year_month.classList.add("padded");
        date_day.classList.add("hidden");
    }

    init();
});

function getStartDay(endDay, dates) {
    const startDay = (endDay - (dates % 7 - 1) < 0) ? endDay - (dates % 7 - 1) + 6 : endDay - (dates % 7 - 1);
    return startDay;
}
function getDates(month) {
    switch (month) {
        case 1: case 3: case 5: case 7: case 8: case 10: case 12: {
            return 31;
        }
        case 4: case 6: case 9: case 11: {
            return 30;
        }
        default: {
            if (year % 4 == 0) {
                if (year % 100 == 0) {
                    if (year % 400 == 0) {
                        return 29;
                    } else {
                        return 28;
                    }
                } else {
                    return 29;
                }
            } else {
                return 28;
            }
        }
    }
}
function setDates() {
    const dates = getDates(month);
    const endDay = new Date(year, month - 1, dates).getDay();
    const startDay = getStartDay(endDay, dates);

    let dateCnt = 1;
    Array.from(days).forEach(day => day.innerHTML = "");
    for (let i = startDay; i < dates + startDay; i++) {
        const link = document.createElement("a");
        link.innerText = dateCnt;
        link.addEventListener("click", flip);
        let days_id = "";
        if (currentCheck() && CURRENT_DATE == dateCnt) {
            days_id = "currentDate";
        } else {
            days_id = "";
        }
        days[i].id = days_id;
        days[i].appendChild(link);
        dateCnt++;
    }
    if (days[35].innerHTML == "") {
        container.classList.add("shorten");
    } else {
        container.classList.remove("shorten");
    }
}

function setYearAndMonth() {
    year_month.innerText = `${year}년 ${month}월`;
}
function setDateAndDay() {
    date_day.innerText = `${date}일 ${day}`;
}
function init() {
    setYearAndMonth();
    setDateAndDay();
    setDates();
}
init();