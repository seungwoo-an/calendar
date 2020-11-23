(()=>{
const today = new Date();
const year_month = document.getElementById("year_month");
const date_day = document.getElementById("date_day");
const dayOfWeek = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"];
const prev = document.getElementById("prev");
const post = document.getElementById("post");
const backArrow = document.getElementById("backArrow");
const days = document.getElementsByClassName("days");
const container = document.getElementById("container");
const details = document.getElementById("details");
const selectedDate = document.getElementById("selectedDate");
const toDoUl = document.getElementById("toDoUl");
const addToDoBtn = document.getElementById("addToDo");
const toDoImg = document.getElementById("toDoImg");
const toDoLabel = document.querySelector("#toDoUl label");
const modal = document.getElementById("modal");
const modalBackground = document.getElementById("modalBackground");
const save = document.getElementById("save");
const cancel = document.getElementById("cancel");
const toDoDetail = document.getElementById("toDoDetail");
const update = document.getElementById("update");

const CURRENT_YEAR = today.getFullYear();
const CURRENT_MONTH = today.getMonth() + 1;
const CURRENT_DAY = dayOfWeek[today.getDay()];
const CURRENT_DATE = today.getDate();

let year = CURRENT_YEAR;
let month = CURRENT_MONTH;
let day = CURRENT_DAY;
let date = CURRENT_DATE;
let clickedDate;

let frontOrBack = true;
let showToDos = false;
console.log(`year : ${year}, month : ${month}, day : ${day}, date : ${date}`);

function closeToDo(){
    toDoDetail.classList.add("hidden");
}
function showToDo(toDoNum){
    const data = getDetails(clickedDate)
    const toDoTitle = document.querySelector("#toDoDetail h1");
    const toDoContent = document.querySelector("#toDoDetail p");
    data.forEach(function(data){
        if(data.toDoNum==toDoNum){
            const title = data.title;
            const content = data.content;
            toDoTitle.innerText=title;
            toDoContent.innerText=content;
            toDoDetail.classList.remove("hidden");
        }
    });
}
function handleTitleClick(event){
    const clickedToDoNum = event.target.parentNode.querySelector("font").innerText;
    showToDo(clickedToDoNum);
}
function refreshUl(){
    const ul_lis = Array.from(toDoUl.getElementsByTagName("li"));
    if (ul_lis.length != 0) {
        ul_lis.forEach(function (li) {
            toDoUl.removeChild(li);
        });
    }
}
function handleDelBtnClick(event){
    const delBtn = event.target;
    const delTarget = delBtn.parentNode.querySelector("font").innerText;
    const data = getDetails(clickedDate);
    data.forEach(function(toDo){
        if(delTarget==toDo.toDoNum){
            data.splice(data.indexOf(toDo),1);
            console.log(data);
            saveDetails(data);
        }
    });
    delBtn.parentNode.remove();
}
function addToDos() {
    refreshUl();
    const toDos = getDetails(clickedDate);
    if (toDos!=null && toDos.length!=0) {
        toDos.forEach(function (toDo) {
            const toDoNum = document.createElement("font");
            const a = document.createElement("a");
            const li = document.createElement("li");
            const delBtn = document.createElement("button");
            toDoNum.innerText = toDo.toDoNum;
            toDoNum.style.display="none";
            delBtn.classList.add("delBtn");
            delBtn.innerText="❌";
            delBtn.addEventListener("click",handleDelBtnClick);
            a.innerText = toDo.title;
            a.addEventListener("click",handleTitleClick);
            li.appendChild(toDoNum);
            li.appendChild(a);
            li.appendChild(delBtn);
            toDoUl.appendChild(li);
        });
    } else {
        const li = document.createElement("li");
        li.innerText = "등록된 일정이 없습니다.";
        toDoUl.appendChild(li);
    }
}
function getDetails(date) {
    return JSON.parse(localStorage.getItem(year + month+date.toString()));
}
function handleToDoClick() {
    let src;
    if (!showToDos) {
        toDoUl.classList.remove("hidden");
        src = "./images/up-arrow.png";
    } else {
        toDoUl.classList.add("hidden");
        src = "./images/down-arrow.png";
    }
    addToDos();
    toDoImg.src = src;
    showToDos = !showToDos;
}
function saveDetails(data){
    localStorage.setItem(year + month + clickedDate, JSON.stringify(data));
}
function handleSaveClick(){
    title = document.querySelector(".title input").value;
    content = document.querySelector(".content textarea").value;
    if (title) {
        const toDo = {
            toDoNum : 1,
            title, content
        }
        let data = getDetails(clickedDate);
        console.log(data);
        if (data == null || data.length==0) {
            data = [toDo];
        } else {
            toDo.toDoNum=data[data.length-1].toDoNum+1;
            data.push(toDo);
        }
        saveDetails(data);
    }
    closeModal();

}
function closeModal() {
    document.querySelector(".title input").value="";
    document.querySelector(".content textarea").value="";
    modal.classList.add("hidden");
    modalBackground.classList.add("hidden");
}
function openModal() {
    modal.classList.remove("hidden");
    modalBackground.classList.remove("hidden");
}
function flip(event) {
    if (frontOrBack) {
        clickedDate = event.target.innerText;
        container.classList.add("flipped");
        details.classList.remove("flipped");
        showToDos=false;
        toDoImg.src="images/down-arrow.png";
        showDetails();
    } else {
        container.classList.remove("flipped");
        details.classList.add("flipped");
        setDates();
    }
    frontOrBack = !frontOrBack;
}
function showDetails() {
    selectedDate.innerText = `${year}년 ${month}월 ${clickedDate}일`;
    refreshUl();
}
function currentCheck() {
    return (CURRENT_YEAR == year && CURRENT_MONTH == month) ? true : false;
}
function handlePrevClick() {
    if (frontOrBack) {
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
        refreshDate();
    }
};
function handlePostClick() {
    if (frontOrBack) {
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
        refreshDate();
    }
};

function getStartDay(endDay, dates) {
    console.log("endDay : " + endDay)
    console.log("dates : " + dates)
    const dayGap = dates%7-1;
    const startDay = (endDay-dayGap<0)?endDay-dayGap+7:endDay-dayGap;
    console.log("startDay : " + startDay);
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
    Array.from(days).forEach(function(day){
        day.innerHTML="";
        day.classList.remove("daysWithToDo");
    })
    for (let i = startDay; i < dates + startDay; i++) {
        const link = document.createElement("a");
        link.innerText = dateCnt;
        link.addEventListener("click", flip);
        let link_id = "";
        if (currentCheck() && CURRENT_DATE == dateCnt) {
            link_id = "currentDate";
        } else {
            link_id = "";
        }
        link.id = link_id;
        days[i].appendChild(link);
        const data = getDetails(dateCnt);
        if(data!=null&&data.length!=0)days[i].classList.add("daysWithToDo");
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
function refreshDate() {
    setYearAndMonth();
    setDateAndDay();
    setDates();

}
function init() {
    refreshDate();
    if (modalBackground) modalBackground.addEventListener("click", closeModal);
    if (save) save.addEventListener("click", handleSaveClick);
    if (cancel) cancel.addEventListener("click", closeModal);
    if (backArrow) backArrow.addEventListener("click", flip);
    if (prev) prev.addEventListener("click", handlePrevClick);
    if (post) post.addEventListener("click", handlePostClick);
    if(toDoDetail)toDoDetail.addEventListener("click",closeToDo)
    if(update)update.addEventListener("click",openModal)
    toDoLabel.addEventListener("click",handleToDoClick);
    toDoImg.addEventListener("click", handleToDoClick);
    addToDoBtn.addEventListener("click", openModal);
}
init();
})();