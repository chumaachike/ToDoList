import Task from './Task';
import threeLine from '../assets/3-vertical-dots.png';

export default class TaskList {
  constructor(placeholder) {
    this.head = null;
    this.size = 0;
    this.tasks =  []
    this.createTask(placeholder, this.tasks);
  }

  createTask = (placeholder, arr) => {
    placeholder.innerHTML = '';
    let i = 0;
    const unorderedList = document.createElement('ul');
    placeholder.appendChild(unorderedList);
    arr.forEach((element) => {
      const listItem = document.createElement('li');
      const checkBox = document.createElement('input');
      const label = document.createElement('label');
      const imgIcon = document.createElement('img');
      imgIcon.src = threeLine;
      imgIcon.setAttribute('height', '30');
      imgIcon.classList.add('move-pointer');
      unorderedList.appendChild(listItem);
      listItem.appendChild(checkBox);
      listItem.appendChild(label);
      listItem.appendChild(imgIcon);
      label.classList.add('label');
      label.setAttribute('data', i);
      i += 1;
      checkBox.type = 'checkbox';
      label.innerHTML = `${element.description}`;
      element.index = i;
    });
    const deleteButoon = document.createElement('button');
    deleteButoon.innerHTML = 'clear all completed items';
    placeholder.appendChild(deleteButoon);
  };
}