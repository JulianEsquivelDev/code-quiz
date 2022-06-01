// selected all id's from the HTML
const quizQ = document.querySelector('#quiz');
const inputs = Array.from(document.querySelectorAll('.choice-input'));
const currentQuestion = document.querySelector('#progressText');
const currentScore = document.querySelector('#score');
const ProBarFull = document.querySelector('#progressBarFull');
// establish key elements for quiz
let ongoingQ = {}
let answerInput = true
let score = 0 
let questionMarker = 0
let openQuestions = []
// create array holding questions for quiz
let quizQs = [
    {
        quizQ: 'What is 2 + 3?',
        option1: '7',
        option2: '5',
        option3: '10',
        option4: '9',
        answer: 2,
    },
    {
        quizQ: 'What is 5 + 7?',
        option1: '8',
        option2: '1',
        option3: '12',
        option4: '15',
        answer: 3,
    },
    {
        quizQ: 'What is 4 x 4?',
        option1: '19',
        option2: '14',
        option3: '7',
        option4: '16',
        answer: 4,
    },
    {
        quizQ: 'What is 2 x 3?',
        option1: '6',
        option2: '2',
        option3: '3',
        option4: '5',
        answer: 1,
    },
    {
        quizQ: 'What is 7 + 1?',
        option1: '3',
        option2: '13',
        option3: '8',
        option4: '9',
        answer: 3,
    }
]
// create value of questions and define how many questions are in the quiz
const SCORE_POINTS = 100
const TOTAL_QUESTIONS = 5
// create function to initiate quiz
startQuiz = () => {
    questionMarker = 0
    score = 0
    openQuestions = [...quizQs]
    // function to cycle through the questions in the array
    nextQuestion()
}
// function to cycle through the questions in the array
nextQuestion = () => {
    if(openQuestions.lenght === 0 || questionMarker > TOTAL_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('/quizend.html')
    }

    questionMarker++
    currentQuestion.innerText = `Question ${questionMarker} of ${TOTAL_QUESTIONS}`
    ProBarFull.getElementsByClassName.width = `${(questionMarker/TOTAL_QUESTIONS) * 100}%`

    const questionsImplication = Math.floor(Math.random() * openQuestions.length)
    ongoingQ = openQuestions[questionsImplication]
    quizQ.innerText = ongoingQ.quizQ

    inputs.forEach(option => {
        const number = option.dataset['number']
        option.innerText = ongoingQ['option' + number]
    })

    openQuestions.splice(questionsImplication, 1)

    answerInput = true
}

inputs.forEach(option => {
    option.addEventListener('click', e => {
        if(!answerInput) return
        
        answerInput = false
        const selectedOption = e.target
        const selectedInput = selectedOption.dataset['number']

        let InputAlert = selectedInput == ongoingQ.answer ? 'correct' : 'incorrect'

        if(InputAlert === 'correct') {
            incrementScore(SCORE_POINTS)
        }

        selectedOption.parentElement.classList.add(InputAlert)

        setTimeout(() => {
            selectedOption.parentElement.classList.remove(InputAlert)
            nextQuestion()

        }, 1000);
    })
})
// increase score as user answers questions
incrementScore = numb => {
    score +=numb
    currentScore.innerText = score
}
// call function that starts the quiz
startQuiz()
// timer
var count = 100;
var interval = setInterval(function(){
    document.getElementById('timer').innerHTML=count;
    count--;
    if (count === 0){
        clearInterval(interval);
        document.getElementById('timer').innerHTML='Time is up';

        alert("You ran out of time!");
    }
}, 1000);