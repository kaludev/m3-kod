const keyboard = document.querySelector('.keyboard');
const inputed = document.querySelector('.inputed');
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
    }else if(keyName == "Enter"){
        if(keyboardLayout[selected.y][selected.x] === 'Backspace'){
            if(inputed.textContent.length > 0){
                inputed.textContent = inputed.textContent.substring(0, inputed.textContent.length-1);
            }
        }else if(keyboardLayout[selected.y][selected.x] === 'Enter'){
            const res = await fetch('/addRecord',{
                
            })
        }else{
            inputed.textContent += keyboardLayout[selected.y][selected.x];
        }
    }
} )

createKeyboard();