const today = new Date();

const year_month = document.getElementById("year_month");
const date_day = document.getElementById("date_day");
const dayOfWeek = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"];
const prev = document.getElementById("prev");
const post = document.getElementById("post");

let year = today.getFullYear();
let month = today.getMonth() + 1;
let day = dayOfWeek[today.getDay()];
let date = today.getDate();
console.log(`year : ${year}, month : ${month}, day : ${day}, date : ${date}`);

prev.addEventListener("click",function(){
    month--;
    if(month<1){
        month=12;
        year--;
    }
    init();
});
post.addEventListener("click",function(){
    month++;
    if(month>12){
        month=1;
        year++;
    }
    init();
});
function showDetails(event){
}
function getStartDay(endDay,dates){
    const startDay = (endDay-(dates%7-1)<0)? endDay-(dates%7-1)+6: endDay-(dates%7-1);
    return startDay;
}
function getDates(month) {
    switch (month) {
        case 1:case 3: case 5: case 7: case 8: case 10:case 12:{
            return 31;
        }
        case 4: case 6: case 9:case 11: {
            return 30;
        }
        default : {
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
    const endDay = new Date(year,month-1,dates).getDay();
    const startDay = getStartDay(endDay,dates);
    const days = document.getElementsByClassName("days");
    let dateCnt=1;
    Array.from(days).forEach(day=>day.innerHTML="");
    for(let i=startDay; i<dates+startDay;i++){
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