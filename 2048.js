
const board;
const score = 0;
const rows = 4;
const columns = 4;

window.onload = function() {
    setGame();
}

function setGame() {
   board = [
            [0,0,0,0],
            [0,0,0,0],
            [0,0,0,0],
            [0,0,0,0]
    ]

  //board = [
   //[2,2,2,2],
    //[2,2,2,2],
    //[4,4,8,8],
  //  [4,4,8,8]
//]


    for (const r = 0; r < rows; r++) {
        for (const c = 0; c < columns; c++) {
            //<div id="0-0"></div>
            const tile = document.createElement("div");
            tile.id = r.toString() + "-" + c.toString();
            const num = board[r][c];
            updateTile(tile, num);
            document.getElementById("board").append(tile);
        }
    }
    setTwo();
    setTwo();
}

function hasEmptyTile() {
    for (const r = 0; r < rows; r++) {
        for (const c = 0; c < columns; c++) {
            if (board[r][c] == 0) {
                return true;
            }
        }
    }
}

function setTwo() {
    if (!hasEmptyTile()) {
        return;
    }

    const found = false;
    while (!found) {
        //ramdom r, c
        const r = Math.floor(Math.random() * rows);//0-1 * 4 -> 0, 3
        const c = Math.floor(Math.random() * columns);

        if (board[r][c] == 0) {
            board[r][c] = 2;
            const tile = document.getElementById(r.toString() + "-" + c.toString());
            tile.innerText = "2";
            tile.classList.add("x2");
            found = true;
        }
    }
}

function updateTile(tile, num) {
    tile.innerText = "";
    tile.classList.value = ""; //clear the classList
    tile.classList.add("tile");
    if (num > 0) {
        tile.innerText = num;
        if (num <= 4096) {
            tile.classList.add("x"+num.toString());
        } else {
            tile.classList.add("x8192");
        }
    }
}

document.addEventListener("keyup", (e) => {
    if (e.code == "ArrowLeft") {
        slideLeft();
        setTwo();
    }
    else if (e.code == "ArrowRight") {
        slideRight();
        setTwo();
    }
    else if (e.code == "ArrowUp") {
        slideUp();
        setTwo();
    }
    else if (e.code == "ArrowDown") {
        slideDown();
        setTwo();
    }
    document.getElementById("score").innerText = score;
})

function filterZero(row) {
    return row.filter(num => num != 0); //create a new arraywithout zeroes
}

function slide(row) {
    //[0,2,2,2]
    row = filterZero(row);//get rid of zeroes -> [2,2,2]

    //slide
    for (const i = 0; i < row.length-1; i++) {
        //check ever 2
        if (row[i] == row[i+1]) {
            row[i] *= 2;
            row[i+1] = 0
            score += row[i];
        }//[2,2,2] -> [4,0,2]        
    }

    row = filterZero(row); //[4,2]

    //add zeroes
    while (row.length < columns) {
        row.push(0);
    }//[4,2,0,0,]

    return row;
}

function slideLeft() {
    for (const r = 0; r < rows; r++) {
        const row = board[r];
        row = slide(row);
        board[r] = row;

        for (const c = 0; c < columns; c++) {
            const tile = document.getElementById(r.toString() + "-" + c.toString());
            const num = board[r][c];
            updateTile(tile, num);
        }
    }
}

function slideRight() {
    for (const r = 0; r < rows; r++) {
        const row = board[r];
        row.reverse();
        row = slide(row);
        row.reverse();
        board[r] = row;

        for (const c = 0; c < columns; c++) {
            const tile = document.getElementById(r.toString() + "-" + c.toString());
            const num = board[r][c];
            updateTile(tile, num);
        }
    }
}

function slideUp() {
    for (const c = 0; c < columns; c++) {
        const row = [board[0][c], board[1][c], board[2][c], board[3][c]];
        row = slide(row);
        board[0][c] = row[0];
        board[1][c] = row[1];
        board[2][c] = row[2];
        board[3][c] = row[3];
        for (const r = 0; r < rows; r++) {
            const tile = document.getElementById(r.toString() + "-" + c.toString());
            const num = board[r][c];
            updateTile(tile, num);
        }
    }
}

function slideDown() {
    for (const c = 0; c < columns; c++) {
        const row = [board[0][c], board[1][c], board[2][c], board[3][c]];
        row.reverse();
        row = slide(row);
        row.reverse();
       // board[0][c] = row[0];
       // board[1][c] = row[1];
       // board[2][c] = row[2];
       // board[3][c] = row[3];
        for (const r = 0; r < rows; r++) {
            board[r][c] = row[r];
            const tile = document.getElementById(r.toString() + "-" + c.toString());
            const num = board[r][c];
            updateTile(tile, num);
        }
    }
}
