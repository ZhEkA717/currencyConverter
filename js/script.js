"use strict";

const inputrub = document.getElementById('rub'),
    inputusd = document.getElementById('usd');

inputrub.addEventListener('input',inventerVal);
inputusd.addEventListener('input',inventerVal);
function inventerVal(e){
    const request = new XMLHttpRequest();
    const currInput = e.target;
    currInput.placeholder='';

    request.open("GET","js/current.json");
    request.setRequestHeader('Content-type','application/json; charset=utf-8');
    request.send();

    if(currInput.value<0){
        currInput.value=0;
    }
    request.addEventListener('load',()=>{
        if(request.status === 200){
            const data = JSON.parse(request.response);
            if(currInput.name == "usd"){
                inputrub.value = (+inputusd.value*data.current.usd).toFixed(2);
            }else if(currInput.name == "rub"){
                inputusd.value = (+inputrub.value/data.current.usd).toFixed(2);
            }
        }else{
            if(currInput.name == "usd"){
                inputrub.placeholder='error 404 (not found)';
                inputrub.value = '';
            }else if(currInput.name == "rub"){
                inputusd.placeholder = 'error 404 (not found)';
                inputusd.value = '';
            }
        }
    });
}