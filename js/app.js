 const deckFonts = ['fa-diamond','fa-diamond',
 'fa-paper-plane-o','fa-paper-plane-o',
 'fa-anchor','fa-anchor',
 'fa-bolt','fa-bolt',
 'fa-cube','fa-cube',
 'fa-leaf','fa-leaf',
 'fa-bicycle','fa-bicycle',
 'fa-bomb', 'fa-bomb'
 ];


let openedCards = [];
let matchedCount = 0;
let movesMade = 0;
let starCount = 3;

$(document).ready(function(){
    displayCards();
    $(".card").click(openCard);
});

$(".restart").click(restart);

function restart(){
    $(".win-panel").remove();
    $(".container").children().show();
    $(".moves").text("0");
    $(".stars").find("i").removeClass("fa-star fa-star-o").addClass("fa-star");
    $(".card").remove();
    shuffle(deckFonts);
    displayCards();

    $(".card").click(openCard);
    openedCards = [];
    matchedCount = 0;
    starCount = 3;
    movesMade = 0;
}
/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
function displayCards(){
    shuffle(deckFonts);
    for (let i = 0 ; i < deckFonts.length; i++)
    {
        let liElement = "<li id=\""+ i +
        "\" class=\"card\"> <i class=\"fa "+
        deckFonts[i] +
        "\"></i></li>";
        $(".deck").append(liElement);
    }
}

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


function openCard(event){
    if ($(event.target).attr("class").includes("card") && (!$(event.target).attr("class").includes("open")))
    {
        $(event.target).addClass("show open");
        openedCards.push($(event.target).attr("id"));
    }

    if (openedCards.length > 1 )
    {
        if(movesMade === 11){
            $(".fa-star:last").removeClass("fa-star").addClass("fa-star-o");
            starCount -= 1;
        }
        else if(movesMade === 14){
            $(".fa-star:last").removeClass("fa-star").addClass("fa-star-o");
            starCount -= 1;
        }
        else if(movesMade === 17){
            $(".fa-star:last").removeClass("fa-star").addClass("fa-star-o");
            starCount -= 1;
        }

        let cardIndex = $(event.target).attr("id");
        if ($("#"+openedCards[0]).find("i").attr("class") === $("#"+cardIndex).find("i").attr("class"))
        {
            //keep this open, for css
            $("#" + cardIndex).addClass("match");
            $("#" + openedCards[0]).addClass("match");
            $("#" + cardIndex).addClass("correct");
            $("#" + openedCards[0]).addClass("correct");
            openedCards.pop();
            openedCards.pop();
            matchedCount += 1;
            movesMade += 1;
            $(".moves").text(movesMade);
            if(matchedCount === 8){
                endGame();
            }
        }
        else{
            $("#" + cardIndex).addClass("incorrect");
            $("#" + openedCards[0]).addClass("incorrect");
            $("#" + cardIndex).removeClass("open");
            $("#" + openedCards[0]).removeClass("open");
            setTimeout(function() {
                $("#" + cardIndex).removeClass("show");
                $("#" + openedCards[0]).removeClass("show");
                $("#" + cardIndex).removeClass("incorrect");
                $("#" + openedCards[0]).removeClass("incorrect")
                openedCards.pop();
                openedCards.pop();
                movesMade += 1;
                $(".moves").text(movesMade);
            }, 250);
        }
    }
}

function endGame(){
    $(".container").children().hide();
    $("body").css({"background" : "#ffffff"});
    let winningPage = "<div class=\"win-panel\">"+
    "<div> <h2>Congratulations! You won!</h2> "+
    "<p> With "+ movesMade +" Moves and "+ starCount + " Stars. <br> Woooooo!</p> "+
    "<p><button onClick=\"restart()\" type=\"button\">Play Again!</button></p></div>"
    "</div>";
    $(".container").append(winningPage);
}


