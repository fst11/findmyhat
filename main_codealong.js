const prompt = require("prompt-sync")({ sigint: true });
const hat = "^";
const hole = "O";
const fieldCharacter = "░";
const pathCharacter = "*";

// set const to ask player for inputs on the number of tiles for the game (W & H);
const _MIN = 5, _MAX = 100;
const _WIDTHPROMPT = `Enter the no. tiles for the game width (min. ${_MIN} - max  ${_MAX}):`;
const _HEIGHTPROMPT = `Enter the no. tiles for the game height (min. ${_MIN} - max  ${_MAX}):`;
const _INVALID = `Please enter a value of ${_MIN} to ${_MAX}`;

// Set constants to inform player if they went OOB/Win/Lose or quit the game
const _OUTOFBOUNDS = "\nOops!!!\nYou are out of game boundary... Please restart and try again!\n ";
const _WIN = "\nYou found your Hat!! Well done...";
const _LOSE = "\nYou fell into a hole!\nGAME OVER!! (DO you want to try again?)\n ";
const _QUIT = "\nYou have quit the game\n\nSee you again!\nSpecial thanks to all my team-mates who make this game possible.\n";
const msg = "\nThank you for playing the game. We hope you have fun...\n \nSpecial thanks to all my team-mates who make this game possible.\n\n";


class Field {
    // constructor initialisation; NOTE: field created for the game is a 2D array;
    constructor(field = new Array([])) {
        this.playGame = false;  //set game play to false;
        this.field = field;     //set the field that was pass in;

        // set the player position;
        this.positX = 0;
        this.positY = 0;
        this.field[0][0] = pathCharacter;
    }



    // start game
    startGame() {
        this.playGame = true;
        this.printInstructions();

        while (this.playGame) {
            // Print Maze
            // TODO: Print maze
            this.printMaze();

            // Prompt player to move
            // TODO: Prompt the player to move
            this.promptMove();

            // Track the player's position and end the game if value returned is _WIN, _LOSE or _OUTOFBOUNDS
            // TODO: track the player's position
            this.trackPlayer();

            // Show pathCharacter at current position
            this.field[this.positY][this.positX] = pathCharacter;
        }
    }


    // give player some instruction how to play the game;
    printInstructions() {
        console.log('To move, enter:\n> "u" to go up\n> "d" to go down\n> "r" to go right\n> "l" to go left\n> "q" or CTRL + C to quit.\n')
    }

    printMaze() {
        for (const map of this.field) {
            console.log(map.join(""));
        }
    }

    promptMove() {
        var moveDirection = prompt("Which way do you want to go? ");
        moveDirection = moveDirection.toLowerCase(); // Convert player's input to lowercase before checking

        switch (moveDirection) {
            // Moves the pathCharacter up by 1
            case "u":
                this.positY -= 1;
                break;

            // Moves the pathCharacter down by 1
            case "d":
                this.positY += 1;
                break;

            // Moves the pathCharacter left by 1
            case "l":
                this.positX -= 1;
                break;

            // Moves the pathCharacter right by 1
            case "r":
                this.positX += 1;
                break;

            // Turns playGame into false to quit the game upon userinput of q
            case "q":
                console.log(_QUIT);
                this.playGame = false;
                break;

            // Shows a message saying invalid direction if any keys are entered except for UDLR
            default:
                console.log(
                    "You have entered an invalid direction. \n\nPlease choose either U, D, L or R\n"
                );
                break;
        }
    }



    // track the player position;
    trackPlayer() {

        let status = "";

        switch (true) {
            // If pathCharacter goes out of bounds then show _OUTOFBOUNDS
            case this.positY < 0 ||
                this.positY > this.field.length -1 ||
                this.positX < 0 ||
                this.positX > this.field.length -1:
                console.log(_OUTOFBOUNDS);
                process.exit();
                break;

            // if pathCharacter steps into a hole then show _LOSE
            case this.field[this.positY][this.positX] === hole:
                console.log(_LOSE);
                process.exit();
                break;

            // if pathCharacter founds the hat then show _WIN
            case this.field[this.positY][this.positX] === hat:
                console.log(_WIN);
                this.endGame(msg) = true;
                break;
        }
        return status;
    }



    // TODO: Set the condition to check if user has gone off-bounds, fallen into the hole or found the hat
    // switch (true) {
    //     case value:

    //         break;

    //     default:
    //         break;
    // }


    endGame(msg) {
        this.playGame = false;
        console.log(msg)
        // use process code to end the game
        process.exit();
        // return this.endGame = true;

    }


    //  Game field; Set game size W*H
    static gameDimensions() {
        const width = this.setDimensions(_WIDTHPROMPT);
        const height = this.setDimensions(_HEIGHTPROMPT);
        return { width, height };
    }

    // Check if player have input W&H;
    static setDimensions(prompter) {
        let dimensionStatus = false;
        let dimension = 0;

        while (!dimensionStatus) {
            dimension = prompt(prompter)
            if (isNaN(dimension) || dimension < _MIN || dimension > _MAX) {
                console.log(_INVALID);
            } else {
                this.printDimension(prompter, dimension)
                dimensionStatus = true;
            }
        }
        return dimension;
    }

    // create message for width or height set;
    static printDimension(prompter, dimension) {
        prompter === _WIDTHPROMPT ? console.log(`Width have been set to: ${dimension}\n`) : console.log(`Height have been set to: ${dimension}\n`);
    }

    // create a 2D field
    static createField(width, height) {

        // to create 2D array using width & heigth input by player;
        const field = new Array(height).fill("").map(Element => new Array(width));

        // create random number bet. 0.1 to 0.2 (keep to 1 dec place)
        let limit = Math.round((Math.random() * 0.1 + 0.1) * 10) / 10;

        // for each unit in X; setting up the game column
        for (let x = 0; x < height; x++) {
            // for each unit in Y; setting up the game row 
            for (let y = 0; y < width; y++) {
                // generate random number
                const ceiling = Math.round(Math.random() * 10) / 10;
                // if the field is less thatn the ceiling; fill the 
                field[x][y] = limit < ceiling ? fieldCharacter : hole;
            }
        }
        let hatY = Math.round(Math.random() * height);
        let hatX = Math.round(Math.random() * width);
        if (hatY === 0 && hatX === 0) {
            hatX = 3;
            hatY = 3;
        }
        field[hatY][hatX] = hat;



        console.log(field);
        return field;
    };

}

// clear screen
console.clear();

// Welcome statment
console.log("Welcome to this find your hat game!\n********************************\n");

// setting the tiles for the game
const gameDimensions = Field.gameDimensions();

// create a 2D array for the game field using gameDimension width & height
const createField = Field.createField(Number(gameDimensions.width), Number(gameDimensions.height));

// instantiate gamefield as the instance of field clasee and start the game.
const gameField = new Field(createField);
gameField.startGame();