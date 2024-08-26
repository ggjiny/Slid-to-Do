export interface Goal {
  updatedAt?: string;
  createdAt?: string;
  title: string;
  id: number;
  userId?: number;
  teamId?: string;
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

export interface NoteTodo {
  done: boolean;
  title: string;
  id: number;
}

export interface NoteGoal {
  title: string;
  id: number;
}

export interface Note {
  todo: NoteTodo;
  updatedAt: string;
  createdAt: string;
  title: string;
  id: number;
  goal: NoteGoal;
}

export interface CreateNote {
  title: string;
  content: string;
  linkUrl?: string;
}

export interface NoteDraft extends CreateNote {
  todoId: number;
  contentWithSpaces: number;
  contentWithoutSpaces: number;
}

export type UpdateNote = Partial<CreateNote>;
