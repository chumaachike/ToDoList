import './index.css';
import TaskList from './module/TaskList';
import { DateTime } from './module/luxton';

const placeHolder = document.querySelector('#place-holder');
const form = document.querySelector('form');
const tasklist = new TaskList(placeHolder);
const checkboxes = document.querySelectorAll('input[type=checkbox]');
const getDate = DateTime.now();
document.querySelector('.footer-year').innerHTML = `${getDate.year}`;


// form.addEventListener('submit', (e) => {
//   e.preventDefault();
//   const object = {
//     iscompleted: false,
//     description: '',
//     index: null,
//   };
//   object.description = document.querySelector('.desc').value;
//   if (object.description === '') {
//     return;
//   }
//   document.querySelector('.desc').value = '';
//   tasklist.addtask(object, placeHolder);

// });
const chores = [
    {
        iscomplted: false,
        description: 'clean the room',
        index: null
    },
    {
        iscomplted: false,
        description: 'wash plates ',
        index: null
    },
    {
        iscomplted: false,
        description: 'go and study',
        index: null
    },
    {
        iscomplted: false,
        description: 'go to school',
        index: 1
    }
]

window.addEventListener('DOMContentLoaded', () => {
    tasklist.createTask(placeHolder, chores)
})
// checkboxes.forEach((checkbox) => checkbox.addEventListener('change', tasklist.isDone.bind(tasklist)));