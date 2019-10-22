let wrong = 0;
let right = 0;
let gameOver = "gameon";
let j = 0;
let correct;

function quiz() {
    if (gameOver === 'gameon') {
        $('#answers').html('')
        $.ajax({
            url: "https://opentdb.com/api.php?amount=10&category=9&type=multiple", success: function (result) {
                $('#questions').html(result.results[j].question)
                let answers = result.results[j].incorrect_answers;
                correct = result.results[j].correct_answer;
                let guess = '';
                let arrayA = answers;
                let arrayB = correct;
                let newArray = arrayA.concat(arrayB);
                shuffleArray(newArray)


                for (let i = 0; i < newArray.length; i++) {

                    let buttons = $('<button id = "' + i + '" class="pure-button" > ' + newArray[i] + '</button>')
                    buttons.appendTo('#answers');
                }
                for (let i = 0; i < newArray.length; i++) {
                    $('#' + i).click(function () {
                        guess = document.getElementById(i).innerHTML
                        checker(guess)
                    })

                }

                //shuffles the array
                function shuffleArray(array) {
                    for (var i = array.length - 1; i > 0; i--) {
                        var j = Math.floor(Math.random() * (i + 1));
                        var temp = array[i];
                        array[i] = array[j];
                        array[j] = temp;
                    }
                }
                if (gameOver = 'gameon') {
                    let timer2 = "0:01";
                    let interval = setInterval(function () {
                        let timer = timer2.split(':');
                        let minutes = parseInt(timer[0], 10);
                        let seconds = parseInt(timer[1], 10);
                        --seconds;
                        minutes = (seconds < 0) ? --minutes : minutes;
                        if (minutes < 0) clearInterval(interval);
                        seconds = (seconds < 0) ? 59 : seconds;
                        seconds = (seconds < 10) ? '0' + seconds : seconds;
                        $('.countdown').html(minutes + ':' + seconds);
                        timer2 = minutes + ':' + seconds;
                        if (timer2 === '0:00') {
                            checker('Nothing');
                        }
                    }, 1000);
                }

                if (wrong === 10) {
                    gameOver = 'gameoff';
                    $('#questions').html(' ');
                    $('#questions').html('wrong: ' + wrong + 'correct: ' + right)
                    $('#buttons').html(' ');
                    $('.countdown').html(' ');


                }
            }


        });
    }
} quiz()



                //checks for correct answer
                function checker(a) {
                    if (a === correct) {
                        console.log("correct");
                        right++;
                        $("#answers").html("Correct!");
                        setTimeout(function () {
                            quiz()
                            j++
                        }, 5000);

                    }
                    else {
                        wrong++
                        $('#buttons').html('The answer was ' + correct);

                    }
                }