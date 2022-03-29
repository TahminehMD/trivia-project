let score = 3;
let time = 10
function startTimer() {
    setInterval(function () {
        if (time > 0) {
            time--
        }
        $("#timer").text(time)
        if (time == 0) {
            window.alert("you lose")
        }
    }, 1000)
}
function resetTimer() {
    time = 10

}
//declare function get question with api and show them
function getQuestion(catId) {


    // remove all buttons
    $('#choices').empty()

    const request = {
        url: `https://opentdb.com/api.php?amount=1&category=${catId}&type=multiple`
    }

    let promise = $.ajax(request)

    promise.then((data) => {
        resetTimer()
        console.log(data) // check json 
        $('#description').text(data.results[0].question)
        let incorrect = data.results[0].incorrect_answers
        let answer = data.results[0].correct_answer
        // create button , and use use math random 
        // shuffle answer of question 
        // use loop 
        let correct_index = Math.floor(Math.random() * 4)
        for (let i = 0; i < 4; i++) {
            let button = $('<button class="choice-button"></button>')
            if (i == correct_index) {
                button.text(answer)
                button.click(() => {
                    score++
                    if (score >= 10) {
                        window.alert("you win")
                    } else {
                        getQuestion(catId)
                    }
                })
            } else {
                button.text(incorrect.pop())
                button.click(() => {
                    score--
                    if (score == 0) {
                        window.alert("you lose")
                    } else {
                        getQuestion(catId)
                    }
                })

            }
            $('#choices').append(button)
        }
        //unhide question div       
        $('#question').css("display", "block")
        // update score 
        $('#score').text("score: " + score)

    }, (error) => { })
}

$('#games').click(() => {
    // hide category buttons (sports , movies , games)
    $('#category').css("display", "none")
    // get question api and display 
    getQuestion(15)
    startTimer()
})
$('#movies').click(() => {
    $('#category').css("display", "none")
    getQuestion(11)
    startTimer()
})
$('#sports').click(() => {
    $('#category').css("display", "none")
    getQuestion(21)
    startTimer()
})

