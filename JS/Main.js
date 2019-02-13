// #region variables / arrays
var choices = [];
var selectedStatementsArray = [];
var selectedPartiesArray = [];
var selectedStatements = new Set();
var selectedParties = new Set();
var page;
var title = document.getElementById('title');
var statement = document.getElementById('statement');
var inputs = document.getElementsByClassName('w3-check');
// #endregion

// #region page variables
var startPage = document.getElementById('intro');
var questionPage = document.getElementById('questions');
var selectImportantPage = document.getElementById('important-statements');
var selectPartiesPage = document.getElementById('parties');
var resultsPage = document.getElementById('results');
// #endregion

// #region btn variables
var agree = document.getElementById('pro');
var ambivalent = document.getElementById('ambivalent');
var disagree = document.getElementById('contra');
var backbtn = document.getElementById('back');
// #endregion

// #region event listeners
document.getElementById('start').addEventListener('click', start);
document.getElementById('skip').addEventListener('click', function(){goToNextPage(0)});
document.getElementById('go-to-parties').addEventListener('click', function(){submitToArray('statements')});
document.getElementById('go-to-result').addEventListener('click', function(){submitToArray('parties')})
backbtn.addEventListener('click', goToPreviousPage);
agree.addEventListener('click', function(){goToNextPage('pro')});
ambivalent.addEventListener('click', function(){goToNextPage('ambivalent')});
disagree.addEventListener('click', function(){goToNextPage('contra')});
// #endregion

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

function loadStatement(){
    questionPage.style.display = "block";
    title.innerHTML = subjects[page].title;
    statement.innerHTML = subjects[page].statement;
    loadButtonColor();
}

function loadSelectStatementsPage(){
    questionPage.style.display = "none";
    selectImportantPage.style.display = "block"
    loadStatements();
}

function loadStatements() {
    document.getElementById('statements').innerHTML = "";
    subjects.forEach(subject => {
        document.getElementById('statements').innerHTML += '<p class="w3-third"><input type="checkbox" value="' + subject.title + '" class="w3-check"><label> ' + subject.title + '</label></p>';
    });
    checkTheChecked('statements');
}

function checkTheChecked(array) {
    console.log(selectedStatements.size, Array.from(selectedStatements))
    for (i = 0; i < inputs.length; i++) {
        for (a = 0; a < ((array == 'statements')? selectedStatements : selectedParties).size; a++) {
            if(array == 'statements'){
                selectedStatementsArray = Array.from(selectedStatements);
                if (inputs[i].value == selectedStatementsArray[a]) {
                    inputs[i].checked = true;
                }
            } else {
                selectedPartiesArray = Array.from(selectedParties);
                if (inputs[i].value == selectedPartiesArray[a]) {
                    inputs[i].checked = true;
                } 
            }  
        }
    }
}

function loadSelectPartiesPage(){
    selectImportantPage.style.display = "none";
    selectPartiesPage.style.display = "block";
    loadParties();
}

function loadResultsPage(){
    selectPartiesPage.style.display = "none";
    resultsPage.style.display = "block";
}

function loadButtonColor() {
    ambivalent.classList.replace('w3-green', 'w3-grey');
    agree.classList.replace('w3-green', 'w3-grey');
    disagree.classList.replace('w3-green', 'w3-grey');
    if (choices[page] == "pro" || choices[page] == "ambivalent" || choices[page] ==  "contra") {
        document.getElementById(choices[page]).classList.add("w3-green");
        document.getElementById(choices[page]).classList.remove('w3-grey');
    }
}

function loadParties(){
    document.getElementById('select-parties').innerHTML = "";
    parties.forEach(party => {
        document.getElementById('select-parties').innerHTML += '<p class="w3-third"><input type="checkbox" value="' + party.name + '" class="w3-check"><label> ' + party.name + ' (' + party.size + ')' + '</label></p>';       
    });
    checkTheChecked('parties');
}


function submitToArray(array){
    for(i = 0; i < inputs.length; i++){
        if(inputs[i].checked){
            ((array == 'statements')? selectedStatements : selectedParties).add(inputs[i].value);
        }        
    }
    if(array == 'parties'){
        console.log(selectedParties);
        if(selectedPartiesArray.length < 3){
            alert('U moet er minstens 3 selecteren! you fucking cunt!');
            return;
        }
    }
    goToNextPage();
}
 
function goToNextPage(answer){
    if(answer != null){
        choices[page] = answer;
    }
    page++;
    console.log(choices);
    if(page == subjects.length){
        loadSelectStatementsPage();
    } else if(selectImportantPage.style.display == "block"){
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
    } else if(selectImportantPage.style.display == "block") {
        selectImportantPage.style.display = "none";
        loadStatement();
    } else if(selectPartiesPage.style.display == "block"){
        selectPartiesPage.style.display = "none";
        loadSelectStatementsPage();
    } else if(resultsPage.style.display == "block"){
        resultsPage.style.display = "none";
        loadSelectPartiesPage();
    } else{
        loadStatement();
    }
}