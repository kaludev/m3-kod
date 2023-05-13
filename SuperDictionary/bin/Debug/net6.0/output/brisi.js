const fs = require('fs');
let chars = [' ','}','{',':','"',',','š','đ','ž','č','ć',"A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z",'0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

for(let i = 0; i < chars.length; i++){
    chars[i] = chars[i].toLowerCase();
}
console.log(chars);
const file = fs.readFileSync('./superdictionary.json').toString();
let newFile = "";
console.log(file.length);
let inside = false;
for (let i = 0; i < 3459000; i++) {
    if(chars.includes(file.at(i))) {
        newFile+= file.at(i);
    }
    if(!inside && file[i] == '\n'){
        newFile+=file[i];
    }
    if(file[i]== '"'){
        inside = !inside;
    }
}
newFile += '}';
fs.writeFileSync('./superdictionary1.json',newFile); 