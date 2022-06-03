import Task from './Task';
import threeLine from '../assets/3-vertical-dots.png';

export default class TaskList {
  constructor(placeholder) {
    this.head = null;
    this.size = 0;
    this.tasks = JSON.parse(localStorage.getItem('todolist')) || [];
    this.createTask(placeholder, this.tasks);
  }

  addtask = (taskDetails, placeholder) => {
    const task = new Task(taskDetails);

    let current;
    if (!this.head) {
      this.head = task;
    } else {
      current = this.head;
      while (current.next_task) {
        current = current.next_task;
      }
      current.next_task = task;
    }
    this.size += 1;
    this.tasks.push(task);
    this.createTask(placeholder, this.tasks);

    localStorage.setItem('todolist', JSON.stringify(this.tasks));
  };

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
      label.innerHTML = `${element.task.description}`;
      element.task.index = i;
    });
    const deleteButoon = document.createElement('button');
    deleteButoon.innerHTML = 'clear all completed items';
    placeholder.appendChild(deleteButoon);
    deleteButoon.addEventListener('click', this.delete.bind(this));
  };

//   isDone(evt) {
//     const label = evt.target.closest('li').children[1];
//     if (evt.target.checked) {
//       label.classList.add('linethrough');
//     } else {
//       label.classList.remove('linethrough');
//     }
//   }

//   getElement(index) {
//     let current = this.head;
//     let count = 0;
//     while (current) {
//       if (count === index) {
//         return current;
//       }
//       count += 1;
//       current = current.next_task;
//     }
//     return null;
//   }

  // delete(placeholder, evt){
  //     const doneItems = document.querySelectorAll('.linethrough');

  //     doneItems.forEach((item)=>{
  //         const index = item.getAttribute('data')
  //         const element = this.getElement(index);
  //     });
  // }
}
