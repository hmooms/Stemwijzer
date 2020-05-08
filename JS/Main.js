// #region variables / arrays
var choices = [];
var selectedStatements = [];
var selectedParties = [];
var page = 0; // this is for index of the subject
var title = document.getElementById('title'); // h1 element
var statement = document.getElementById('statement'); // p element
const big = 7; // used to select big parties
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
document.getElementById('deselect-all-statements').onclick = function(){deselectAll('statements')};
document.getElementById('deselect-all-parties').onclick = function(){deselectAll('parties')};
document.getElementById('select-big-parties').onclick = function(){selectParties('big')};
document.getElementById('select-all').onclick = function(){selectParties('all')};
document.getElementById('select-secular').onclick = function(){selectParties('secular')};
document.getElementById('start').addEventListener('click', start);
document.getElementById('skip').addEventListener('click', function(){goToNextPage(0)});
document.getElementById('go-to-parties').addEventListener('click', function(){submitToArray('statements', 'next')});
document.getElementById('go-to-result').addEventListener('click', function(){submitToArray('parties', 'next')})
backbtn.addEventListener('click', goToPreviousPage);
agree.addEventListener('click', function(){goToNextPage('pro')});
ambivalent.addEventListener('click', function(){goToNextPage('ambivalent')});
disagree.addEventListener('click', function(){goToNextPage('contra')});
// #endregion

// subjects and parties array is from http://stemwijzer.dvc-icta.nl/data.js 


function start(){
    startPage.style.display = "none";
    backbtn.style.display = "block";
    loadStatement();
}


function loadStartPage(){
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

/* 
 * Change colour to see your choice
 */
function loadButtonColor() {
    // In order to avoid having multiple green answers 
    ambivalent.classList.replace('w3-green', 'w3-grey');
    agree.classList.replace('w3-green', 'w3-grey');
    disagree.classList.replace('w3-green', 'w3-grey');
    
    // checks what the user chose and changes it to green
    if (choices[page] == "pro" || choices[page] == "ambivalent" || choices[page] ==  "contra") {
        document.getElementById(choices[page]).classList.replace('w3-grey', "w3-green");
    }
}


function loadSelectStatementsPage(){
    questionPage.style.display = "none";
    selectImportantPage.style.display = "block"
    loadAllStatements();
}

/* 
 * load all statements for the load select statements page
 */
function loadAllStatements() {
    document.getElementById('statements').innerHTML = "";
    subjects.forEach(subject => {
        document.getElementById('statements').innerHTML += '<p class="w3-third"><input type="checkbox" value="' + subject.title + '" class="w3-check statement"><label> ' + subject.title + '</label></p>';
    });
    checkTheChecked('statements');
}

function loadSelectPartiesPage(){
    selectImportantPage.style.display = "none";
    selectPartiesPage.style.display = "block";
    loadParties();
}

/* 
 * Load all the parties for the select parties page
 */

function loadParties(){
    document.getElementById('select-parties').innerHTML = "";
    parties.forEach(party => {
        document.getElementById('select-parties').innerHTML += '<p class="w3-third"><input type="checkbox" value="' + party.name + '" class="w3-check party"><label> ' + party.name + ' (' + party.size + ')' + '</label></p>';       
    });
    checkTheChecked('parties');
}

/* 
 * the parameter is either statements or parties string
 * At the select important statements or parties page:
 * checking the already selected checkboxes
 */
function checkTheChecked(array) {
    // put the elements with the right class in array
    inputs = document.getElementsByClassName((array == 'statements')? 'statement' : 'party');

    for (i = 0; i < inputs.length; i++) {

        // loop over either the slectedStatements or selectedParties array 
        for (a = 0; a < ((array == 'statements')? selectedStatements : selectedParties).length; a++) {
            if(array == 'statements'){
                // if it was added to the array it means it was checked
                if (inputs[i].value == selectedStatements[a]) {
                    inputs[i].checked = true;
                }
            } else {
                // if it was added to the array it means it was checked
                if (inputs[i].value == selectedParties[a]) {
                    inputs[i].checked = true;
                } 
            }  
        }
    }
}

/*
 * Type parameter is either statements or parties
 * Simply unchecks all checkboxes 
 */
function deselectAll(type){
    inputs = document.getElementsByClassName((type == 'statements')? 'statement' : 'party');
    for(var i = 0; i < inputs.length; i++){
        inputs[i].checked = false;
    }
}

/*
 * Type parameter is either secular, all or big
 * selects all of the parties or the ones that are either secular or big  
 */
function selectParties(type){
    // gets checkboxes
    inputs = document.getElementsByClassName("party");

    for(var i = 0; i < parties.length; i++){
        if(type == "secular"){
            if(parties[i].secular == true){
                inputs[i].checked = true;
            } else{
                inputs[i].checked = false;
            }
        } else if(type == "all"){
            inputs[i].checked = true;
        } else if(type == "big"){
            if(parties[i].size >= big){
                inputs[i].checked = true;    
            } else{
                inputs[i].checked = false;
            }            
        }
    }
}

/* 
 * array parameter is eiter statements or parties, direction parameter is next or null
 */
function submitToArray(array, direction){
    inputs = document.getElementsByClassName((array == 'statements')? 'statement' : 'party');

    ((array == 'statements')? selectedStatements : selectedParties).length = 0; // resets array in order to avoid getting doubles
    
    for(i = 0; i < inputs.length; i++){
        if(inputs[i].checked){
            ((array == 'statements')? selectedStatements : selectedParties).push(inputs[i].value);
        }        
    }
    // if you go to previous page you don't need to select 3 only when you go to next page
    if(array == 'parties' && direction == 'next'){
        if(selectedParties.length < 3){
            alert('U moet er minstens 3 selecteren');
            return;
        }
    }
    // if the direction is null it must have come from go to previous page
    if(direction == 'next'){
        goToNextPage();
    }  
}

/* 
 * check if it got an answer so it can put that in the choices array
 * depending on current page goes to according next page
 */
function goToNextPage(answer){
    if(answer != null){
        choices[page] = answer;
    }
    page++;
    // checks if it was last page
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

/* 
 * checks what page it is and choses the according next(previous) one
 */
function goToPreviousPage(){
    page--;
    if(page == -1){
        page = 0 // reset the page to 0 because otherwise problem with loading subjects
        loadStartPage();
    } else if(selectImportantPage.style.display == "block") {
        selectImportantPage.style.display = "none";
        submitToArray('statements')
        loadStatement();
    } else if(selectPartiesPage.style.display == "block"){
        selectPartiesPage.style.display = "none";
        submitToArray('parties')
        loadSelectStatementsPage();
    } else if(resultsPage.style.display == "block"){
        resultsPage.style.display = "none";
        loadSelectPartiesPage();
    } else{
        loadStatement();
    }
}


function loadResultsPage(){
    selectPartiesPage.style.display = "none";
    resultsPage.style.display = "block";
    loadResults();
}

/*
 * Load results for result page 
 */
function loadResults(){
    var results = getResults();

    document.getElementById("resultlist").innerHTML = "";

    for (var i = 0; i < results.length; i++) {
        document.getElementById("resultlist").innerHTML += "<h3>[" + results[i].name + "] = " + results[i].value + "%</h3><hr>";

    }
}

/*
 * looping over all the selected parties
 * every selected party get made into an new object and put in a new array
 * that array gets sorted on value high to low 
 * probably could have done it easier but it was a year ago so please have mercy
 */
function getResults(){
    var calculatedParties =[];

    for(var i = 0; i < parties.length; i++){
        selectedParties.forEach(party => {
            if(parties[i].name == party){
                calculatedParties.push(new Party(parties[i]));
            }
        });
    }

    calculatedParties.sort((a, b) => b.value - a.value);
    return calculatedParties;
}

// A class for party so i can give it a value (matching value)
class Party {
    constructor(party) {
        this.name = party.name;
        this.value = this.calculateMatch(party);
    }

    /*
     *  calculating match %
     */
    calculateMatch(){
        var sameAnswer = 0;
        // adding selected statements to max questions so we can't get more than 100% when calculating match
        var maxQuestions = subjects.length + selectedStatements.length;
    
        for(var i = 0; i < subjects.length; i++){
            if(choices[i] == 0){ // zero means skipped question and thus will it not count to total
                maxQuestions--;
            } else {
                // in subjects there is a parties array with their position on that subject
                subjects[i].parties.forEach(party => { 
                    // check if it is this same party
                    if (party.name == this.name){
                        // check if their position is the same
                        if (party.position == choices[i]) {
                            sameAnswer++;
                            // checking if we have selected the statement as important
                            for(var a = 0; a < selectedStatements.length; a++){
                                // if it matches with party it will count extra
                                if (subjects[i].title == selectedStatements[a]) {
                                    sameAnswer++;
                                }
                            }
                        }
                    }
                });
            }
        }
        var value = Math.round(sameAnswer / maxQuestions * 100); // get a rounded precentage
        
        return value;
    }
}