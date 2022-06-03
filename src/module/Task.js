export default class Task {
  constructor (task, next_task = null){
    this.task = task;
    this.next_task = next_task;
  }
}