const today = new Date();

const year_month = document.getElementById("year_month");
const date_day = document.getElementById("date_day");
const dayOfWeek = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"];

let year = today.getFullYear();
let month = today.getMonth() + 1;
let day = dayOfWeek[today.getDay()];
let date = today.getDate();
console.log(`year : ${year}, month : ${month}, day : ${day}, date : ${date}`);

function showDetails(event){
    console.log(event.target);
}
function getStartDay(endDay,dates){
    const startDay = (dates%7==0)?7-endDay:dates%7-endDay;
    return startDay;
}
function getDates() {
    switch (month) {
        case 1, 3, 5, 7, 8, 10, 12: return 31;
        case 4, 6, 9, 11: return 30;
        case 2: {
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
    const dates = getDates();
    console.log(`total dates : ${dates}`);
    const endDay = new Date(year,month-1,dates).getDay();
    const startDay = getStartDay(endDay+1,dates);
    console.log(`startDay : ${startDay}, ${dayOfWeek[startDay]}`);
    console.log(`endDay : ${endDay}, ${dayOfWeek[endDay]}`);
    const days = document.getElementsByClassName("days");
    let dateCnt=1;
    Array.from(days).forEach(day=>day.innerHTML="");
    for(let i=startDay; i<dates;i++){
        const link = document.createElement("a");
        link.innerText=dateCnt;
        link.addEventListener("click",showDetails);
        days[i].appendChild(link);
        dateCnt++;
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