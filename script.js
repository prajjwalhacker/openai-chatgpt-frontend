import bot from './assets/bot.svg';
import user from './assets/user.svg';

const form = document.querySelector('form');
const chatContainer = document.querySelector('#chat_container');

let loadInterval;

const loading = '';   

const appendInLoading = () => {
     setInterval(() => {
       if (loading.length === 3) {
          loading = '.';    
       }
       else {
        loading += '.';
       } 
     }, 500);
}

