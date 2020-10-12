// Create the questions in array.
var questions = [{
    // Question 1
    title: "Who directed The Nightmare Before Christmas? ",
    choices: ["Tim Burton", "Vincent Price", "Walt Disney", "Henry Selick"],
    answer: "Henry Selick",
},
{
    // Question 2
    title: "What does Jack Skellington disguise himself as in Christmas Town? ",
    choices: ["A Christmas tree", "A snowman", "Santa Claus", "A light pole"],
    answer: "A snowman",
},
{
    // Question 3
    title: "When going to capture 'Sandy Claws', what do Lock, Shock, and Barrell travel in? ",
    choices: ["A fridge", "A sink", "A dishwasher", "A bathtub"],
    answer: "A bathtub",
},
{
    // Question 4
    title: "What's the name of Jack's ghost dog? ",
    choices: ["Spot", "Zero", "Frankenweenie", "Sparky"],
    answer: "Zero",
},
{
    // Question 5
    title: "What animal is on the Mayor's suit? ",
    choices: ["Cat", "Newt", "Spider", "Bat"],
    answer: "Spider"
},
];


// Create the VARS that will be needed
var questionEl = document.querySelector("#question");
var questionListEl = document.querySelector("#question-list");
var questionResultEl = document.querySelector("#question-result");
var timerEl = document.querySelector("#timer");
var viewHighScores = document.querySelector("#viewHighScores");
var welcomeArea = document.querySelector(".welcome-area");
var startBtn = document.querySelector("#startBtn");
var mainQuestionArea = document.querySelector(".main-question-area");
var questionIndex = 0;
var correctCount = 0;

// ad vars for hold time and interval id
var time = questions.length * 5;
var intervalId;

 
//    Start the user on the Welcome Screen.
// when the user clciks the startBtn, the first question is rendered and the timer starts

startBtn.addEventListener("click", renderQuestion);

function renderQuestion() {

    // Remove our welcome section from the browser and render the questions
        welcomeArea.style.display = "none";
    mainQuestionArea.style.display = "block";

    // If the timer hits 0 seconds we call endQuiz().
    if (time === 0) {
        endQuiz();
    }

    //call updateTime every 1 second.
    intervalId = setInterval(updateTime, 1000);

    // create code to generate the user's questions
    questionEl.textContent = questions[questionIndex].title;
    questionListEl.innerHTML = "";

    // Store the user's answers in choices.
    var choices = questions[questionIndex].choices;
    var choicesLength = choices.length;

    // Work through all of the user's choices and append them to the page 
    for (var i = 0; i < choicesLength; i++) {
        
        var questionListItem = document.createElement("li");
        questionListItem.textContent = choices[i];
        questionListEl.append(questionListItem);
    }
}

//The checkAnswer() function stores the user's choices and uses input
//validation to ensure the user clicked on a valid li tag. 
//It also evaluates if the question was answered correctly.

function checkAnswer(event) {
    // pause the timer
    clearInterval(intervalId);

    // Store the user's click as a variable.
    var target = event.target;

    // validate that the user clicked on a valid li element.
    if (target.matches("li")) {

        // Store the actual text content of the li element in variable, 'selectedChoice'.
        var selectedChoice = event.target.textContent;

        // Compare selectedChoice to the correct answer from the current question object.
        if (selectedChoice === questions[questionIndex].answer) {
            // If the selectedChoice is the correct answer, increment correctCount variable by 1.
            correctCount++;

            // Display a message to the user letting them know they were correct.
            questionResultEl.textContent = "You have gotten this one...CORRECT!";
        }
        else {

            // If the selectedChoice is not the correct answer, decrement correctCount variable by 1.
            correctCount--;
            time -= 2;

            // Display a message to the user letting them know they were incorrect.
            questionResultEl.textContent = "You have gotten this one...WRONG!";
        }

    }

    // Wait 2 seconds and then call the nextQuestion() function.
    setTimeout(nextQuestion, 2000);
}


//Create code so that we can retrieve the next question for the user.
function nextQuestion() {
    questionResultEl.textContent = "";

    questionIndex++;

    // continiue to call additional questions, if any left to ask
    // If not, just end the quiz.
    if (questionIndex === questions.length) {
        timer = 0;
        endQuiz();
    } else {
        renderQuestion();
    }
}

// Display our running timer to the user. 

function updateTime() {
    timerEl.textContent = time;
    // decrement time
    time--;
    // if time is up end the quiz
    if (time === 0) {
        endQuiz();
    }
}


//  The endQuiz() function clears the timer and brings the user to the High Scores Page

function endQuiz() {

    // clear interval
    clearInterval(intervalId);

    // Show the user the quiz is over
    setTimeout(showHighScore, 2000);
}

//Create function to tie name and score together for HighScores Page
function showHighScore() {
    // Prompt user for name
    document.body.textContent = "";

    // Create our containing div, container. Add to the body.
    var div = document.createElement("div");
    div.setAttribute("class", "container highscores-display");
    document.body.append(div);


    // Create our heading content. Style. Add to our div.
    var heading = document.createElement("h2");
    heading.innerHTML = `You scored ${correctCount}! <br/> Add your initials to the leaderboard!`;
    div.append(heading);

    // Create our input box. Style. Add to our div.
    inputBox = document.createElement("input");
    inputBox.setAttribute("id", "nameBox");
    div.append(inputBox);


    // Create our submit button. Style. Add to our div.
    btnSubmit = document.createElement("button");
    btnSubmit.setAttribute("type", "submit");
    btnSubmit.setAttribute("class", "customBtn");
    btnSubmit.textContent = "Submit";
    div.append(btnSubmit);

    // Define what our submit button will do:
    btnSubmit.addEventListener("click", function (event) {
        // Prevent the input box from automatically clearing out.
        event.preventDefault();
        // Store the value from our input box.
        name = inputBox.value;
        // Display the high scores to the user.
        toHighScore();
    });
}

// create function to bring user to the HighScores Page once quiz is finished.
function toHighScore() {
    // Stop our timer.
    clearInterval(intervalId);

    // Make room for the high scores.
    document.body.textContent = "";

    // Check if there is anything in local storage and store it in variable
    var high_score = localStorage.getItem("scores");

    // if high scores doesn't exist
    if (!high_score) {
        // create empty array
        high_score = [];
    } else {
        // parse stringified array
        high_score = JSON.parse(high_score);
    }

    // Create our user object.
    var user = {
        name: name,
        score: correctCount
    }

    // Push our user object values into high_score.
    high_score.push(user);

    // Set our highscores to localStorage.
    localStorage.setItem("scores", JSON.stringify(high_score))

    // Sort the high scores by greatest to least using the sort function.
    high_score.sort(function (a, b) {
        return b.score - a.score;
    });


    // Display our highscore to the user.

    // Create our heading content.
    var heading = document.createElement("h2");
    heading.textContent = "Highscores";

    // Create our containing div, container.
    var div = document.createElement("div");
    // Append this div to the body.
    document.body.append(div);
    div.setAttribute("class", "container highscores-display");
    // append our heading to this new div.
    div.append(heading);

    // Create our containing UL.
    var contentUL = document.createElement("ul");
    contentUL.setAttribute("id", "highscore-list");

    // Create our "Go Back" buttons.
    var button = document.createElement("button");

    // Create our "Clear Highscores" button
    var clearButton = document.createElement("button");

    // Add our customBtn CSS class for styling.
    button.setAttribute("class", "customBtn");
    button.textContent = "Go back";

    // Add our custom CSS classing for styling.
    clearButton.setAttribute("class", "customBtn");
    clearButton.textContent = "Clear Highscores";

    // Loop through our scores and names and display them to the user.
    for (var i = 0; i < high_score.length; i++) {
        var contentLi = document.createElement("li");

        // Do not display scores if there is no username AND a zero score.
        // This allows our users to skip right to the highscores without registering a score.
        if (high_score[i].name != null && high_score[i].score != 0) {

            // Display our high score name and score.
            contentLi.innerHTML = `<strong>Player: </strong> ${high_score[i].name} <strong>Score:</strong> ${high_score[i].score}`
            // Append our Li to the parent ul.
            contentUL.append(contentLi);
        }
    }
    // Add our UL to the div.
    div.append(contentUL);

    // Add our buttons to the div.
    // go back button
    div.append(button);
    // clear highscores
    div.append(clearButton);

    // Our button sends the user to the start of the quiz.
    button.addEventListener("click", function () {
        location.reload();
    });

    // Our clear button clears out the highscores from local storage.
    clearButton.addEventListener("click", function () {
        localStorage.clear();
        contentUL.textContent = "";
    });

}


// Listen for a click on any of the LI elements, check their answer with the checkAnswer() function.
questionListEl.addEventListener("click", checkAnswer);

// Listen for a click on the "View Highscores" link. Allow the user to view scores without playing, entering a name, or having a score.
viewHighScores.addEventListener("click", toHighScore);