import Task from './Task';
import delButton from '../assets/3-vertical-dots.png';
import threeVerticalLines from '../assets/download.png';

export default class TaskList {
  constructor(placeholder) {
    this.tasks = JSON.parse(localStorage.getItem('todolist')) || [];
    this.head = this.tasks[this.tasks.length - 1];
    this.size = this.tasks.length;
    this.createTask(placeholder, this.tasks);
    this.delImage = document.createElement('img');
    this.delImage.src = delButton;
    this.delImage.setAttribute('height', '30');
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
      this.head = task;
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
      imgIcon.src = threeVerticalLines;
      imgIcon.setAttribute('height', '30');
      imgIcon.classList.add('move-pointer');
      imgIcon.addEventListener(
        'click',
        this.deleteTask.bind(this, placeholder),
      );
      unorderedList.appendChild(listItem);
      listItem.appendChild(checkBox);
      listItem.appendChild(label);
      listItem.appendChild(imgIcon);
      label.classList.add('label');
      label.setAttribute('data', i);
      checkBox.type = 'checkbox';
      checkBox.addEventListener('change', this.isDone.bind(this));
      label.innerHTML = `${element.task.description}`;
      element.task.index = i;
      this.head = element[i];
      i += 1;
    });
    const deleteButoon = document.createElement('button');
    deleteButoon.innerHTML = 'clear all completed items';
    placeholder.appendChild(deleteButoon);
    deleteButoon.addEventListener('click', this.delete.bind(this, placeholder));
  };

  isDone(evt) {
    const label = evt.target.closest('li').children[1];
    if (evt.target.checked) {
      label.classList.add('linethrough');
      const index = label.getAttribute('data');
      this.tasks[index].task.iscompleted = true;
      localStorage.setItem('todolist', JSON.stringify(this.tasks));
    } else {
      label.classList.remove('linethrough');
      const index = label.getAttribute('data');
      this.tasks[index].task.iscompleted = false;
      localStorage.setItem('todolist', JSON.stringify(this.tasks));
    }
  }

  getElement(index) {
    let current = this.head;
    let count = 0;
    while (current) {
      if (count === index) {
        return current;
      }
      count += 1;
      current = current.next_task;
    }
    return null;
  }

  delete(placeholder) {
    this.tasks = this.tasks.filter((task) => task.task.iscompleted === false);
    localStorage.setItem('todolist', JSON.stringify(this.tasks));
    this.createTask(placeholder, this.tasks);
  }

  deleteTask(placeholder, evt) {
    const editInput = document.createElement('input');
    editInput.type = 'text';
    const label = evt.target.closest('li').children[1];
    editInput.setAttribute('data', label.getAttribute('data'));
    label.replaceWith(editInput);
    const editButton = evt.target.closest('li').children[2];
    editButton.replaceWith(this.delImage);
    this.delImage.addEventListener(
      'click',
      this.delTask.bind(this, placeholder),
    );
    editInput.addEventListener(
      'keypress',
      this.editInput.bind(this, placeholder),
    );
  }

  delTask(placeholder, evt) {
    const label = evt.target.closest('li').children[1];
    const index = label.getAttribute('data');
    this.tasks.splice(index, 1);
    localStorage.setItem('todolist', JSON.stringify(this.tasks));
    this.createTask(placeholder, this.tasks);
  }

  editInput(placeholder, evt) {
    if (evt.key === 'Enter') {
      const index = evt.target.closest('li').children[1].getAttribute('data');
      this.tasks[index].task.description = evt.target.closest('li').children[1].value;
      localStorage.setItem('todolist', JSON.stringify(this.tasks));
      this.createTask(placeholder, this.tasks);
      evt.target.closest('li').children[1].value = '';
    }
  }
}
