export class Todo {
  title: string;
  desc: string;
  priority: string;
  dueDate: string;
  status: boolean;
  history: string[];

  constructor(title: string, desc: string, priority: string,dueDate: string, status: boolean) {
    this.title = title;
    this.desc = desc;
    this.priority = priority;
    this.dueDate = dueDate;
    this.status = status;
    this.history = [`Created: ${new Date().toLocaleString()}`]; // Initialize with creation timestamp
  }

  
  addHistory(entry: string) {
    this.history.push(`${entry}: ${new Date().toLocaleString()}`);
}

}
