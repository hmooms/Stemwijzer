// variables
var choices = [];
var question;
var startPage = document.getElementById('intro');
var questionPage = document.getElementById('questions');
var selectImportant = document.getElementById('important-statements');
var selectPartiesPage = document.getElementById('select-parties');

var agree = document.getElementById('pro');
var ambivalent = document.getElementById('ambivalent');
var disagree = document.getElementById('contra');

// event listeners
document.getElementById('start').addEventListener('click', start);
document.getElementById('back').addEventListener('click', previousPage);
document.getElementById('skip').addEventListener('click', function(){nextPage(0)});
agree.addEventListener('click', function(){nextPage('pro')});
ambivalent.addEventListener('click', function(){nextPage('ambivialent')});
disagree.addEventListener('click', function(){nextPage('contra')});

function start(){
    startPage.style.display = "none";
    questionPage.style.display = "block";
    question = 0;
}

function intro(){
    startPage.style.display = "block";
    questionPage.style.display = "none";
}

function selectParties(){
    questionPage.style.display = "block";
}

function nextPage(answer){
    choices[question] = answer;
    if(question = subjects.length){
        selectParties();
    } else{
        question++;
    }
}

function previousPage(){
    if(question = 0){
        intro();
    } else{
        question--;
    }
}

