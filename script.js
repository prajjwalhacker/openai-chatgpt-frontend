const userSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#fff" class="bi bi-person" viewBox="0 0 16 16">
<path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4Zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10Z"/>
</svg>`

const botSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#fff" class="bi bi-robot" viewBox="0 0 16 16">
  <path d="M6 12.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5ZM3 8.062C3 6.76 4.235 5.765 5.53 5.886a26.58 26.58 0 0 0 4.94 0C11.765 5.765 13 6.76 13 8.062v1.157a.933.933 0 0 1-.765.935c-.845.147-2.34.346-4.235.346-1.895 0-3.39-.2-4.235-.346A.933.933 0 0 1 3 9.219V8.062Zm4.542-.827a.25.25 0 0 0-.217.068l-.92.9a24.767 24.767 0 0 1-1.871-.183.25.25 0 0 0-.068.495c.55.076 1.232.149 2.02.193a.25.25 0 0 0 .189-.071l.754-.736.847 1.71a.25.25 0 0 0 .404.062l.932-.97a25.286 25.286 0 0 0 1.922-.188.25.25 0 0 0-.068-.495c-.538.074-1.207.145-1.98.189a.25.25 0 0 0-.166.076l-.754.785-.842-1.7a.25.25 0 0 0-.182-.135Z"/>
  <path d="M8.5 1.866a1 1 0 1 0-1 0V3h-2A4.5 4.5 0 0 0 1 7.5V8a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1v1a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-1a1 1 0 0 0 1-1V9a1 1 0 0 0-1-1v-.5A4.5 4.5 0 0 0 10.5 3h-2V1.866ZM14 7.5V13a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V7.5A3.5 3.5 0 0 1 5.5 4h5A3.5 3.5 0 0 1 14 7.5Z"/>
</svg>`;

const form = document.querySelector('form');
const chatContainer = document.querySelector('#chat_container');
let intervalId;

async function apiForAnswer(prompt, node) {
   
   try {
      const response = await fetch('http://localhost:8000', {
         method: 'POST', // HTTP method
         headers: {
           'Content-Type': 'application/json', // Sending JSON data
         },
         body: JSON.stringify({ prompt })
       })
       const res = await response.json();

       node.nodeValue = res.bot;
       clearInterval(intervalId);
   }
   catch (err) {
      console.log("err");
      console.log(err);
   }
}


const generateRandomId = () => {
    const str = 'abcdefsfsdkjdfdsfjdsf12493249203390@E@@(#@(#(@$(@';
    let id = '';
    for (let i =0; i < str.length; i++) {
       id += str[Math.ceil(Math.random() * str.length)];
    }
    return id;
 }


const loader = (node) => {
   let loadingText = '';
   intervalId = setInterval(() => {
      if (node.nodeValue.length === 4) {
         node.nodeValue = '.';
      }
      else {
        node.nodeValue += '.';
      }
   }, 500);
}

function appendUserMessage(id, message) {
    const userDiv = document.createElement('div');
    userDiv.classList.add('user-chat');
    const svgElement = document.createElement('div');
    svgElement.innerHTML = userSvg; // Assuming userSvg is valid SVG markup
    userDiv.setAttribute('id', `user-chat-${id}`);
    const textNode = document.createTextNode(message);
    userDiv.appendChild(svgElement.firstChild);
    userDiv.appendChild(textNode);
    chatContainer.appendChild(userDiv);

    const botDiv = document.createElement('div');
    botDiv.classList.add('bot-chat');
    const botId= generateRandomId();
    const textNodeBot = document.createTextNode('...');

    botDiv.setAttribute('id', `bot-chat-${botId}`);
    const svgElementBot = document.createElement('div');
    svgElementBot.innerHTML = botSvg; // Assuming userSvg is valid SVG mark;
    botDiv.appendChild(svgElementBot.firstChild);
    botDiv.appendChild(textNodeBot);
    chatContainer.appendChild(botDiv);
    chatContainer.scrollTop = chatContainer.scrollHeight;
    loader(textNodeBot);
    apiForAnswer(message, textNodeBot);
}

const buttonContaier = document.getElementById('send-button');
const textAreaDiv = document.getElementById('input-box');

buttonContaier.addEventListener('click', () => {

    const id = generateRandomId();
    const message = textAreaDiv.value;
    appendUserMessage(id, message);
});
