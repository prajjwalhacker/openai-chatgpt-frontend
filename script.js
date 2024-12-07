
const form = document.querySelector('form');
const chatContainer = document.querySelector('#chat_container');

function apiForAnswer() {
   
}


const generateRandomId = () => {
    const str = 'abcdefsfsdkjdfdsfjdsf12493249203390@E@@(#@(#(@$(@';
    let id = '';
    for (let i =0; i < str.length; i++) {
       id += str[Math.ceil(Math.random() * str.length)];
    }
    return id;
 }

function appendUserMessage(id, message) {
    const userDiv = document.createElement('div');
    userDiv.classList.add('user-chat');
    userDiv.setAttribute('id', `user-chat-${id}`);
    userDiv.textContent = message;
    chatContainer.appendChild(userDiv);
}

const buttonContaier = document.getElementById('send-button');
const textAreaDiv = document.getElementById('input-box');

buttonContaier.addEventListener('click', () => {

    const id = generateRandomId();
    const message = textAreaDiv.value;
    appendUserMessage(id, message);
});
