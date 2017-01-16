// $(document).ready(function() {
/* body... */
var attackPower = 0;
var playersCharacter;
var currentEnemy;
var htmlbuild;
var characters = {
    originalStarbuck: {
        name: 'Original Starbuck',
        health: 120,
        attack: 8,
        imageUrl: "assets/images/orig_starbuck_1.jpg",
        enemyAttackBack: 15
    },
    newStarbuck: {
        name: 'New Starbuck',
        health: 100,
        attack: 14,
        imageUrl: "assets/images/new_starbuck_2.jpg",
        enemyAttackBack: 5
    },
    originalCylon: {
        name: 'Original Cylon',
        health: 150,
        attack: 8,
        imageUrl: "assets/images/cylon_2.jpg",
        enemyAttackBack: 20
    },
    newCylon: {
        name: 'New Cylon',
        health: 180,
        attack: 7,
        imageUrl: "assets/images/new_cylon.jpg",
        enemyAttackBack: 25
    }
};


function resetGame() {
    attackPower = 0;
    playersCharacter = undefined;
    currentEnemy = undefined;
    htmlbuild;
    characters = {
        originalStarbuck: {
            name: 'Original Starbuck',
            health: 120,
            attack: 8,
            imageUrl: "assets/images/orig_starbuck_1.jpg",
            enemyAttackBack: 15
        },
        newStarbuck: {
            name: 'New Starbuck',
            health: 100,
            attack: 14,
            imageUrl: "assets/images/new_starbuck_2.jpg",
            enemyAttackBack: 5
        },
        originalCylon: {
            name: 'Original Cylon',
            health: 150,
            attack: 8,
            imageUrl: "assets/images/cylon_2.jpg",
            enemyAttackBack: 20
        },
        newCylon: {
            name: 'New Cylon',
            health: 180,
            attack: 7,
            imageUrl: "assets/images/new_cylon.jpg",
            enemyAttackBack: 25
        }


    };
    // reset original HTML
    $(".friendBox").html("");
    $("enemyBox").html("");
    $(".charDivCenter").removeClass("hideMe");
    $(".charDivCenter").removeClass("currentEnemy");
    $(".charDivCenter").removeClass("enemyCharacter");
    $(".charDivCenter").addClass("playableCharacter");
    $(".instructionalText").html("Choose your Champion!");
    $(".resultsBox").removeClass("blackText");
    $(".resultsBox").html("");
};


function defeatedEnemy() {
    alert("You have beaten " + currentEnemy.name);
    currentEnemy = undefined;
    $('.enemyBox').html("");
    $(".resultsBox").html("");
    $(".instructionalText").html("Who do you want to fight next?");
};

function defeatedPlayer() {
    alert("You Died!!!");
    resetGame();
};

function updateResultsText() {
    var resultsHtml = "<p> You attacked " + currentEnemy.name + " for " + playersCharacter.attack + " Health Points!</p>";
    resultsHtml += "<p>" + currentEnemy.name + " has counter-attacked you for " + currentEnemy.enemyAttackBack + " Health Points!</p>"
    resultsHtml += "<p> You have " + playersCharacter.health + " Health Points remaining! </p>";
    resultsHtml += "<p>" + currentEnemy.name + " has " + currentEnemy.health + " Health Points remaining!</p>";
    $(".resultsBox").html(resultsHtml);
};

function defeat() {
    if (currentEnemy.health < 1 && playersCharacter.health > 0) {
        defeatedEnemy();
    } else if (playableCharacter.health < 1) {
        defeatedPlayer();
    }
};
/* On hover of the center character div, run function. */
$(".charDivCenter").hover(function() {
        /* get ID of image */
        var placeholder = this.id;
        /* declare character.id to access object values. EXAMPLE = hovering over image of jack returns
         id of jack(as declared in html). vitalStats would equal the object of characters.jack*/
        var vitalStats = characters[placeholder];
        /* because vitalStats is now a specific character from characters object, we can now access
        their name, health points, attack, and even counter attack if we chose to. The code below 
        gets the name, HP, and attack and generates HTML containing it.*/

        $(".instructionalText").html("<p>" + vitalStats.name + " has : " + vitalStats.hp + " Health Points and " + vitalStats.attack + " Attack Power.</p>");

    },
    /* above half runs on mouse enter hover area, 
       here on down runs on mouse exit hover area */
    function() {
        if (playersCharacter === undefined) {
            $(".instructionalText").html("<p>Choose your Champion!</p>");
        } else if (playersCharacter !== undefined && currentEnemy === undefined) {
            $(".instructionalText").html("<p>Choose your foe!</p>");
        } else {
            $(".instructionalText").html("<p>FIGHT!</p>");
        }
    }
);

/* on click of the center character box */
$(".charDivCenter").on("click", function() {
    if (playersCharacter === undefined) {

        var placeholder = this.id;
        playersCharacter = characters[placeholder];
        console.log(playersCharacter);

        attackPower = playersCharacter.attack;

        $(this).addClass("hideMe");

        $(".charDivCenter").removeClass("playableCharacter");

        $(".charDivCenter").addClass("enemyCharacter");


        htmlBuild = "<img src='assets/images/" + placeholder + ".jpg'" + ">"

        $(".friendBox").html(htmlBuild);

        $(".instructionalText").html("Who will you fight?");

    } else if (currentEnemy === undefined && playersCharacter !== undefined) {

        var placeholder = this.id;

        currentEnemy = characters[placeholder];

        console.log(currentEnemy);

        $(this).addClass("hideMe");
        $(this).removeClass("enemyCharacter");

        $(this).addClass("currentEnemy");

        htmlBuild = "<img src='assets/images/" + placeholder + ".jpg'" + ">"

        $(".enemyBox").html(htmlBuild);
        $(".instructionalText").html("FIGHT!");
    }
});

/* on click of the fight button */
$(".fightButton").on("click", function() {
    /* make sure it only runs if both enemy and character are chosen */
    if (playersCharacter !== undefined && currentEnemy !== undefined) {
        /* remove enemy health based on your character attack */
        currentEnemy.health -= playersCharacter.attack;
        /* remove your health based on their counter attack */
        playersCharacter.health -= currentEnemy.enemyAttackBack;
        /* run function to post results */
        updateResultsText();
        /* increment attack based on global variable we declared earlier */
        playersCharacter.attack += attackPower;
        /* Are either of them dead? */
        defeat();
    };
});

/* on click of reset button */
$(".resetButton").on("click", function() {
    resetGame();

});








// {name: 'Original Starbuck', img: <img src='assets/images/orig_starbuck_1.jpg' alt='Original Starbuck'>, health : 120, ap: 12, ca: 10},
// {name: 'New Starbuck', img: <img src='assets/images/new_starbuck_2.jpg' alt='New Starbuck'>, health : 100, ap: 8, ca: 6},
// {name: 'Original Cylon', img: <img src='assets/images/cylon_2.jpg' alt='Original Cylon'>, health : 150, ap: 15, ca: 13},
// {name: 'New Cylon', img: <img src='assets/images/new_cylon.jpg' alt='New Cylon'>, health : 180, ap: 6, ca: 4}
