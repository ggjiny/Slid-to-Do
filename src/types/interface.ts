export interface Goal {
  updatedAt: string;
  createdAt: string;
  title: string;
  id: number;
  userId: number;
  teamId: string;
}

export interface Todo {
  noteId: number | null;
  done: boolean;
  linkUrl: string | null;
  fileUrl: string | null;
  title: string;
  id: number;
  goal: Goal | null;
  userId: number;
  teamId: string;
  updatedAt: string;
  createdAt: string;
}
