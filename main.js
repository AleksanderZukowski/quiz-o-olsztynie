const questions = [
    {
        text: "Pytanie 1",
        options: ["Poprawna","Zła","Zła"],
        right: 0
    },
    {
        text: "Pytanie 2",
        options: ["Zła","Dobra"],
        right: 1
    },
    {
        text: "Pytanie 3",
        options: ["Zła","Zła","Zła","Dobra"],
        right: 3
    },
    {
        text: "Pytanie 4",
        options: ["Poprawna","Zła","Zła"],
        right: 0
    },
    {
        text: "Pytanie 5",
        options: ["Zła","Dobra"],
        right: 1
    },
    {
        text: "Pytanie 6",
        options: ["Zła","Zła","Zła","Dobra"],
        right: 3
    }
];

let currentQuestion = 0;
let answers = [];

function display(question) {
    $('#question').text(question.text);
    let buttons = '';
    if (currentQuestion == answers.length) {
        question.options.forEach((option,i) => {
            buttons += `<button value="${i}">${option}</button>`;
        });
    } else {
        question.options.forEach((option,i) => {
            buttons += `<button value="${i}"`
            console.log(currentQuestion,answers);
            if (i == answers[currentQuestion]) {
                buttons += ' class="clicked-button" ';
            }
            buttons += `>${option}</button>`;
        });
    }
    buttons += "<div style='clear: both'></div>";
    $('#answer').text("");
    $(buttons).appendTo("#answer");
    $('#answer button').click(function(){
        buttonClick($(this).val());
    });
}

function buttonClick(value) {
    if (currentQuestion == answers.length) {
        answers.push(value);
    } else {
        answers[currentQuestion] = value;
    }
    currentQuestion++;
    if (currentQuestion <= questions.length -1) {
        display(questions[currentQuestion])
    } else {
        finish();
    }
    console.log(answers);
    questionBarUpdate();
}

$(document).ready(() => {
    display(questions[currentQuestion]);
    questionBarUpdate();
});

function questionBarUpdate() {
    let questionBar = '<div>';
    for (let i = 0; i < questions.length; i++) {
        questionBar += `<span class="q-n" value="${i}"></span>`;
    }
    questionBar += '</div>';
    $("#question-bar").text("");
    questions.forEach((question,i) => {
        let el =  $(questionBar).find(`[value="${i}"]`);
        //console.log(el);
        if (i <= answers.length) {
            el.attr("class","q-a");
            el.click(function() {
                currentQuestion = i;
                display(questions[i]);
                questionBarUpdate();
                console.log(answers);
            });
        }
        if (i == currentQuestion) {
            el.attr("class","q-c");
        }
        //console.log(el)
        $(el).appendTo($("#question-bar"));
    });

}

function check() {
    let score = 0;
    answers.forEach((answer,i) => {
        if (answer == questions[i].right) {
            score++;
        }
    });
    return score;
}

function words(score) {
    let ratio = score/questions.length;
    if (ratio < 0.4) return "Uda Ci się nastęonym razem!";
    else if (ratio < 0.8) return "Nawet dobrze Ci poszło!";
    else if (ratio == 1) return "Perfekcyjnie!";
    else if (ratio < 1) return "Prawie idealnie, gratulacje!";
} 

function finish() {
    let score = check();
    let word = words(score);
    console.log(word);
    let endScreen = `<div style="width:100%;text-align:center;"><h1>Koniec quizu</h1><br>Zdobyłeś ${score} punktów na ${questions.length}<br>${word}</div>`;
    $("#answer").text("");
    $("#question").text("");
    $("main").text("");
    $(endScreen).appendTo("main");
}
