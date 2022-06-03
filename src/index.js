import './index.css';
import TaskList from './module/TaskList';
import { DateTime } from './module/luxton';

const placeHolder = document.querySelector('#place-holder');
const tasklist = new TaskList(placeHolder);
const getDate = DateTime.now();
document.querySelector('.footer-year').innerHTML = `${getDate.year}`;

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
