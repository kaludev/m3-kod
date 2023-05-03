const keyboard = document.querySelector('.keyboard');
const inputed = document.querySelector('.inputed');
const output = document.querySelector('.output');
const leaderboard = document.querySelector('.leaderboard');
const keyboardLayout = [
    ['q','w','e','r','t','y','u','i','o','p'],
      ['a','s','d','f','g','h','j','k','l','Enter'],
    ['z','x','c','v','b','n','m','Backspace']
]
let selected = {x:0,y:0};
const createKeyboard = () => {
    for(let i = 0; i < keyboardLayout.length;i++){
        let row = document.createElement('div');
        row.classList.add('keyboardRow');
        for(let j = 0; j < keyboardLayout[i].length; j++) {
            let key = document.createElement('div');
            key.classList.add('keyboardKey');
            if(i === 0 && j === 0){
                key.classList.add('selected');
            }
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
        if(keyboardLayout[selected.y][selected.x] === 'Backspace'){
            if(inputed.textContent.length > 0){
                inputed.textContent = inputed.textContent.substring(0, inputed.textContent.length-1);
            }
        }else if(keyboardLayout[selected.y][selected.x] === 'Enter'){
            const score = getCookie("score");
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
                output.textContent = "Uspesno sacuvan rezultat"
            }else{
                //nadamo se da se nikada nece prikazati xD
                output.textContent = "greska pri cuvanju rezultata";
            }
            reloadBest();
        }else{
            inputed.textContent += keyboardLayout[selected.y][selected.x];
        }
    }
} )


const reloadBest = async () =>{
    const res = await fetch('/getrecords');
    const data = await res.json();
    leaderboard.innerHTML = "";
    data.users.forEach(element => {
        const li = document.createElement('li');
        li.textContent = element.name + ':' + element.score;
        leaderboard.appendChild(li);
    });
}

reloadBest();

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