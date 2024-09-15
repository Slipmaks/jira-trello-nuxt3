export interface TaskI {
  id: string;
  title: string;
  relatedTo: any[];
  description: string;
  status: TaskStatusT;
  priority: TaskPriorityT;
  created_date: string;
}

export type TaskStatusT = "todo" | "progress" | "done";
export type TaskPriorityT = "high" | "medium" | "low";
