const resultEl=document.getElementById('result');
const lenghtEl=document.getElementById('lenght');
const uppercaseEl=document.getElementById('uppercase');
const lowercaseEl=document.getElementById('lowercase');
const numberEl=document.getElementById('number');
const symbolsEl=document.getElementById('symbols');
const generateEl=document.getElementById('generate');
const clipboardEl=document.getElementById('clipboard');

const randomFunc={
    lower:getRandomLower,
    upper:getRandomUpper,
    number:getRandomDigit,
    symbol:getRandomSymbols
}

// clipboardEl.addEventListener('click',()=>{

//     const textarea=document.createElement('textarea');
//     const password=resultEl.innerText;

//     if(!password){ return ;}
//     textarea.value=password;
//     document.body.appendChild(textarea);
//     textarea.select();
//     console.log(textarea.value);
// });

let promise = Promise.resolve(1);

const copy = async() => {

    const textarea=document.createElement('textarea');
    const password=resultEl.innerText;
    
    if(!password){ 
        let promise = Promise.resolve(1);
        return await promise;
    }
    
    textarea.hidden=true;
    textarea.value=password;
    textarea.classList.add('tocopy');
    document.body.appendChild(textarea);

    return await navigator.clipboard.writeText(document.querySelector("textarea.tocopy").value);
}

clipboardEl.addEventListener('click',copy);

generateEl.addEventListener('click',()=>{

    const lenght= +lenghtEl.value;// + sign convert char to integer
    const hasLower=lowercaseEl.checked;
    const hasupper=uppercaseEl.checked;
    const hasnumber=numberEl.checked;
    const hassymbol=symbolsEl.checked;

    resultEl.innerHTML=generatePassword(lenght,hasLower,hasupper,hasnumber,hassymbol);
});

function generatePassword(lenght,lower,upper,number,symbol){

    let generatedPassword='';
    const typesCount=lower+upper+number+symbol;
    const typesArray=[{lower},{upper},{number},{symbol}].filter(item=>Object.values(item)[0]);

    if(typesCount===0){
        return '';
    }

    for(let i=0;i<lenght;i+=typesCount){

        typesArray.forEach(type=>{

            const funcName=Object.keys(type)[0];
            generatedPassword+=randomFunc[funcName]();
        });

    }

    const finalPassword=generatedPassword.slice(0,lenght);
    return finalPassword;

}

function getRandomLower(){
    return String.fromCharCode( Math.floor(Math.random()*(122-97)+97));
}

function getRandomUpper(){
    return String.fromCharCode( Math.floor(Math.random()*(90-65)+65));
}

function getRandomDigit(){
    return String.fromCharCode( Math.floor(Math.random()*(57-48)+48));
}

function getRandomSymbols(){
    
    liste=[
        Math.floor(Math.random()*(47-33)+33),
        Math.floor(Math.random()*(64-58)+58),
        Math.floor(Math.random()*(96-91)+91),
        Math.floor(Math.random()*(126-123)+123)
    ];

    return String.fromCharCode(liste[Math.floor(Math.random() * liste.length)]);
}


