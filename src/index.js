import './index.css';
import TaskList from './module/TaskList';
import { DateTime } from './module/luxton';

const placeHolder = document.querySelector('#place-holder');
const form = document.querySelector('form');
const tasklist = new TaskList(placeHolder);
const getDate = DateTime.now();
document.querySelector('.footer-year').innerHTML = `${getDate.year}`;

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const object = {
    iscompleted: false,
    description: '',
    index: null,
  };
  object.description = document.querySelector('.desc').value;
  if (object.description === '') {
    return;
  }
  document.querySelector('.desc').value = '';
  tasklist.addtask(object, placeHolder);
});
