// variables
var choices = [];
var selectedParties = [];
var page;
var startPage = document.getElementById('intro');
var questionPage = document.getElementById('questions');
var selectImportant = document.getElementById('important-statements');
var selectPartiesPage = document.getElementById('parties');
var agree = document.getElementById('pro');
var ambivalent = document.getElementById('ambivalent');
var disagree = document.getElementById('contra');
var title = document.getElementById('title');
var statement = document.getElementById('statement');
var backbtn = document.getElementById('back');

// event listeners
document.getElementById('start').addEventListener('click', start);
document.getElementById('skip').addEventListener('click', function(){goToNextPage(0)});
backbtn.addEventListener('click', goToPreviousPage);
agree.addEventListener('click', function(){goToNextPage('pro')});
ambivalent.addEventListener('click', function(){goToNextPage('ambivialent')});
disagree.addEventListener('click', function(){goToNextPage('contra')});

function start(){
    startPage.style.display = "none";
    backbtn.style.display = "block";
    page = 0;
    loadStatement();
}

function loadIntro(){
    startPage.style.display = "block";
    questionPage.style.display = "none";
    backbtn.style.display = "none";
}

function loadSelectPartiesPage(){
    questionPage.style.display = "none";
    selectPartiesPage.style.display = "block";
    loadParties();
}

function loadStatement(){
    questionPage.style.display = "block";
    title.innerHTML = subjects[page].title;
    statement.innerHTML = subjects[page].statement;
}

function loadParties(){
    document.getElementById('test').innerHTML = "";
    parties.forEach(party => {
        document.getElementById('test').innerHTML += '<p class="w3-third"><input type="checkbox" value="' + party.name + '" class="choose-party w3-check"><label> ' + party.name + '</label></p>';       
    });
}

function loadResultsPage(){

}

function goToNextPage(answer){
    choices[page] = answer;
    page++;
    if(page == subjects.length){
        loadSelectPartiesPage();
    } else if(selectPartiesPage.style.display == "block"){
        loadResultsPage();
    } else{
        loadStatement();
    }
}

function goToPreviousPage(){
    page--;
    if(page == -1){
        loadIntro();
    } 
    // else if(importantQuestions == "block") {
    //    loadStatement()
    // } 
    else if(selectPartiesPage.style.display == "block"){
        selectPartiesPage.style.display = "none";
        loadStatement();
    } else{
        loadStatement();
    }
}