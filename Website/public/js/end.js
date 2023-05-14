const keyboard = document.querySelector('#keyboard');
const inputed = document.querySelector('#input-input');
const output = document.querySelector('.output');
const leaderboardNames = document.querySelector('#leaderboard-names-container');
const leaderboardScores = document.querySelector('#leaderboard-scores-container');
const leaderboardHeaders = document.querySelectorAll('.leaderboard-head');
const keyboardLayout = [
    ['Q', 'W', 'E', 'R', 'T', 'Z', 'U', 'I', 'O', 'P', 'Š', 'Đ'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'Č', 'Ć'],
    ['Y', 'X', 'C', 'V', 'B', 'N', 'M', 'Ž', ' ', ' ']
]
let selected = {x:0,y:0};
const createKeyboard = () => {
    for(let i = 0; i < keyboardLayout.length;i++){
        let row = document.createElement('div');
        row.classList.add('keyboardRow');
        for(let j = 0; j < keyboardLayout[i].length; j++) {
            let key = document.createElement('div');
            if (i === 2 && j === 8) {
                key.classList.add('keyboardKey');
                let icon = document.createElement('img');
                icon.classList.add("keyboardBackspaceIcon");
                key.appendChild(icon);
            }
            else if (i === 2 && j === 9) {
                key.classList.add('keyboardEnter');
                let icon = document.createElement('img');
                icon.classList.add("keyboardEnterIcon");
                key.appendChild(icon);
            }
            else if (i === 0 && j === 0) key.classList.add('selected');
            else key.classList.add("keyboardKey");

            key.textContent = keyboardLayout[i][j];
            row.appendChild(key);
        }
        keyboard.appendChild(row);
    }
}
createKeyboard();
const clearSelected = () => {
    document.querySelector('.selected').classList.remove('selected');
};

const reloadSelected = () => {
    document.querySelectorAll('.keyboardRow')[selected.y].querySelectorAll('.keyboardKey')[selected.x].classList.add('selected');
}
document.addEventListener("keydown" , async(event) =>{
    const keyName = event.key;
    if (keyName == "ArrowUp"){
        clearSelected();
        selected.y--;
        selected.y =  ((selected.y%keyboardLayout.length)+keyboardLayout.length)%keyboardLayout.length;
        if(selected.x >= keyboardLayout[selected.y].length){
            selected.x = keyboardLayout[selected.y].length-1;
        }
        reloadSelected();
    }else if(keyName == "ArrowDown"){
        clearSelected();
        selected.y++;
        selected.y =  ((selected.y%keyboardLayout.length)+keyboardLayout.length)%keyboardLayout.length;
        if(selected.x >= keyboardLayout[selected.y].length){
            selected.x = keyboardLayout[selected.y].length-1;
        }
        reloadSelected();
    }else if(keyName == "ArrowLeft"){
        clearSelected();
        selected.x--;
        selected.x =  ((selected.x%keyboardLayout[selected.y].length)+keyboardLayout[selected.y].length)%keyboardLayout[selected.y].length;
        reloadSelected();
    }else if(keyName == "ArrowRight"){
        clearSelected();
        selected.x++;
        selected.x =  ((selected.x%keyboardLayout[selected.y].length)+keyboardLayout[selected.y].length)%keyboardLayout[selected.y].length; 
        reloadSelected();
    }else if(keyName == "f"){
        const uploaded = getCookie("uploaded");
        if(!uploaded){
            if(keyboardLayout[selected.y][selected.x] === 'Backspace'){
                if(inputed.textContent.length > 0){
                    inputed.textContent = inputed.textContent.substring(0, inputed.textContent.length-1);
                }
            }else if(keyboardLayout[selected.y][selected.x] === 'Enter'){
                const uploaded = getCookie("uploaded");
                if(!uploaded){
                    setCookie("uploaded","1");
                    const score = getCookie("score");
                    setCookie("score","0",1);
                    const res = await fetch('/addRecord',{
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            name: inputed.textContent,
                            score: score
                        })
                    })
                    const data = await res.json();
                    if(data.ok){
                        output.textContent = "Uspesno sacuvan rezultat";
                        document.querySelector("#content-left-side").style.display = "none";
                    }else{
                        //nadamo se da se nikada nece prikazati xD
                        output.textContent = "greska pri cuvanju rezultata";
                    }
                    
                    reloadBest();
                }
            }else{
                if(inputed.textContent.length <13){
                    inputed.textContent += keyboardLayout[selected.y][selected.x];
                }
            }
        }else{
            location.href = "/"
        }
    }
} )

const refreshLeaderboard = () => {
    leaderboardNames.innerHTML = "";
    leaderboardNames.appendChild(leaderboardHeaders[0]);
    leaderboardScores.innerHTML = "";
    leaderboardScores.appendChild(leaderboardHeaders[1]);
}
const reloadBest = async () =>{
    const res = await fetch('/getrecords');
    const data = await res.json();
    refreshLeaderboard();
    data.users.forEach(element => {
        const name = document.createElement('p');
        name.classList.add('leaderboard-name');
        name.textContent = element.name;
        leaderboardNames.appendChild(name);
        const score = document.createElement('p');
        score.classList.add('leaderboard-score');
        score.textContent = element.score;
        leaderboardScores.appendChild(score);
    });
}

reloadBest();

function setCookie(name,value,days) {
    let expires = "";
    if (days) {
        let date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}

function getCookie(name) {
    let nameEQ = name + "=";
    let ca = document.cookie.split(';');
    for(let i=0;i < ca.length;i++) {
        let c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}
function eraseCookie(name) {   
    document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}