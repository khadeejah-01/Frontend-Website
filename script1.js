 
// APP STATE
 
let habitsArray = [];
let currentWeekOffset = 0;


// DOM ELEMENTS
const addHabitBtn = document.getElementById("addHabitBtn");
const habitInput = document.getElementById("habitInput");
const containerGrid = document.getElementById("containerGrid");

const successSound =
document.getElementById("successSound");

const emptyState =
document.getElementById("emptyState");

// Week buttons
const prevWeekBtn = document.getElementById("prevWeekBtn");
const nextWeekBtn = document.getElementById("nextWeekBtn");
const todayBtn = document.getElementById("todayBtn");


// ENTER KEY SUPPORT

habitInput.addEventListener("keydown", function(event){
    if(event.key === "Enter"){
        addHabit();
    }
});


// LOAD FROM LOCALSTORAGE

const savedHabits =
JSON.parse(localStorage.getItem("habits"));

if(savedHabits){
    habitsArray = savedHabits;
}


// SAVE FUNCTION

function saveHabits(){
    localStorage.setItem(
        "habits",
        JSON.stringify(habitsArray)
    );
}


// EMPTY STATE

const quotes = [
    "Small progress is still progress 🌱",
    "Our character, basically, is a composite of our habits. — Stephen R. Covey",
    "Consistency beats intensity 🔥",
    "We are what we repeatedly do. Excellence, then, is not an act, but a habit. — Aristotle ",
    "Tiny habits create big results ✨",
    "Sow a thought, and you reap an act; Sow an act, and you reap a habit; Sow a habit, and you reap a character; Sow a character, and you reap a destiny. — Samuel Smiles",
    "Your future is built daily 🚀"
];

function updateEmptyState(){
    const randomQuote =
        quotes[Math.floor(Math.random()*quotes.length)];
    if(habitsArray.length === 0){
        emptyState.style.display = "block";

        

        emptyState.textContent = "You don't have any habits,🐝let's start building towards your future!\n\n"+ randomQuote;
    }
    else{
        emptyState.style.display = "block";
        emptyState.textContent = randomQuote;
    }
}


// WEEK KEY FUNCTION

function getWeekKey(){

    const today = new Date();

    today.setDate(
        today.getDate() + currentWeekOffset * 7
    );

    const year = today.getFullYear();

    const start = new Date(year,0,1);

    const days = Math.floor((today - start)/86400000);

    const week = Math.ceil((days + start.getDay()+1)/7);

    return `${year}-W${week}`;
}


// STREAK FUNCTION

function calculateStreak(completedDays){

    let streak = 0;

    for(let i=0; i<completedDays.length; i++){
        if(completedDays[i]){
            streak++;
        }
    }

    return streak;
}


// CREATE HABIT ROW

function createHabitRow(habit){

    const weekKey = getWeekKey();

    // ensure week exists
    if(!habit.weeks){
        habit.weeks = {};
    }

    if(!habit.weeks[weekKey]){
        habit.weeks[weekKey] =
        [false,false,false,false,false,false,false];
    }

   
    // HABIT CELL
    
    const habitCell =
    document.createElement("div");

    habitCell.classList.add("habit-row","habit-cell");

    const habitText =
    document.createElement("span");

    habitText.textContent = habit.name;

    // rename
    const renameBtn =
    document.createElement("button");

    renameBtn.textContent = "✏️";

    renameBtn.addEventListener("click", function(){

        const newName =
        prompt("Rename habit", habit.name);

        if(newName){
            habit.name = newName.trim();
            saveHabits();
            renderTracker();
        }
    });

    // delete
    const deleteBtn =
    document.createElement("button");

    deleteBtn.textContent = "🗑️";

    deleteBtn.addEventListener("click", function(){

        habitsArray =
        habitsArray.filter(item => item.id !== habit.id);

        saveHabits();
        renderTracker();
        updateEmptyState();
    });

    habitCell.appendChild(habitText);
    habitCell.appendChild(renameBtn);
    habitCell.appendChild(deleteBtn);

    containerGrid.appendChild(habitCell);

    
    // STREAK CELL
    
    const streakCell =
    document.createElement("div");

    const streak =
    calculateStreak(habit.weeks[weekKey]);

    streakCell.textContent = `🔥 ${streak}`;

    streakCell.classList.add("habit-row");

    containerGrid.appendChild(streakCell);


    // DAYS

    const jsDay = new Date().getDay();
    let todayIndex = jsDay - 1;

    if(todayIndex === -1){
    todayIndex = 6;
    }

    for(let i=0; i<7; i++){

        const dayCell =
        document.createElement("div");

        dayCell.classList.add("habit-row");

        //  TODAY HIGHLIGHT
        if(currentWeekOffset === 0 && i === todayIndex){
          dayCell.classList.add("today");
        }
        const checkbox =
        document.createElement("input");

        checkbox.type = "checkbox";

        checkbox.checked =
        habit.weeks[weekKey][i];

        // disable future weeks
        if(currentWeekOffset > 0){
            checkbox.disabled = true;
        }

        checkbox.addEventListener("change", function(){

            habit.weeks[weekKey][i] =
            checkbox.checked;

            saveHabits();

            if(checkbox.checked){
                dayCell.classList.add("celebrate");
                successSound.currentTime = 0;
                successSound.play();

                setTimeout(()=>{
                    dayCell.classList.remove("celebrate");
                },300);
            }

            renderTracker();
        });

        dayCell.appendChild(checkbox);
        containerGrid.appendChild(dayCell);
    }
}


// ADD HABIT

function addHabit(){

    const habitName =
    habitInput.value.trim();

    if(habitName === ""){
        alert("Please enter a habit");
        return;
    }

    habitsArray.push({
        id: Date.now(),
        name: habitName,
        weeks: {}
    });

    saveHabits();
    renderTracker();
    updateEmptyState();

    habitInput.value = "";
}


// RENDER

function renderTracker(){

    const oldRows =
    containerGrid.querySelectorAll(".habit-row");

    oldRows.forEach(row => row.remove());

    habitsArray.forEach(createHabitRow);

    updateEmptyState();

    document.getElementById("weekLabel").textContent =
    getWeekKey();
}


// WEEK NAVIGATION

prevWeekBtn.addEventListener("click", function(){
    currentWeekOffset--;
    renderTracker();
});

nextWeekBtn.addEventListener("click", function(){
    currentWeekOffset++;
    renderTracker();
});

todayBtn.addEventListener("click", function(){
    currentWeekOffset = 0;
    renderTracker();
});


// INIT

renderTracker();
updateEmptyState();