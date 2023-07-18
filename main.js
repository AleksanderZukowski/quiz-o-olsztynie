const questions = [
    {
        text: "1. Ile jest Olsztynów w rzece?",
        options: ["Mało","trzynaście","jarosław boberek"],
        right: 0
    },
    {
        text: "2. Ile to 2+2????",
        options: ["Nie wiem","Może"],
        right: 1
    }
];

let currentQuestion = 0;
let score = 0;

function display(question) {
    $('#question').text(question.text);
    let buttons = '';
    question.options.forEach((option,i) => {
        buttons += `<button value="${i}">${option}</button>`;
    });
    buttons += "<div style='clear: both'></div>";
    $('#answer').text("");
    $(buttons).appendTo("#answer");
    $('#answer button').click(function(){
        check($(this).val());
    });
}


$(document).ready(() => {
    display(questions[currentQuestion])
});

function check(value) {
    if (value == questions[currentQuestion].right) {
        score += 1;
    }
    currentQuestion ++;
    if (currentQuestion > questions.length-1) {
        finish();
    } else {
        display(questions[currentQuestion]);
    }
}

function words(ratio) {
    if (ratio < 0.4) return "Uda Ci się nastęonym razem!";
    else if (ratio < 0.8) return "Nawet dobrze Ci poszło!";
    else if (ratio == 1) return "Perfekcyjnie!";
    else if (ratio < 1) return "Prawie idealnie, gratulacje!";
} 

function finish() {
    let word = words(score/questions.length);
    console.log(word);
    let endScreen = `<div style="width:100%;text-align:center;"><h1>Koniec quizu</h1><br>Zdobyłeś ${score} punktów na ${questions.length}<br>${word}</div>`;
    $("#answer").text("");
    $("#question").text("");
    $("main").text("");
    $(endScreen).appendTo("main");
}
