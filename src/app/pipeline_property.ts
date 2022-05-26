type Task_Property = {
  name: string;
  value: string;
}
export interface TaskInterface {
    taskname: string;
    property: Task_Property[];
  } 
export interface Pipeline {
    id: number;
    name: string;
}