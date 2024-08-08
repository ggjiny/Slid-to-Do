import { Todo } from '@/types/interface';
import { useEffect, useState } from 'react';

function useTodoDetail(todo: Todo) {
  const [done, setDone] = useState(todo.done);
  const [title, setTitle] = useState(todo.title);
  const [fileUrl, setFileUrl] = useState(todo.fileUrl);
  const [linkUrl, setLinkUrl] = useState(todo.linkUrl);
  const [isModified, setIsModified] = useState(false);
  const [goal, setGoal] = useState<{ id: number; title: string } | null>(
    todo.goal,
  );

  useEffect(() => {
    const isTitleChanged = title !== todo.title;
    const isGoalChanged = goal?.id !== todo.goal?.id;
    const isFileUrlChanged = fileUrl !== todo.fileUrl;
    const isLinkUrlChanged = linkUrl !== todo.linkUrl;
    const isDoneChanged = done !== todo.done;

    setIsModified(
      isTitleChanged ||
        isGoalChanged ||
        isFileUrlChanged ||
        isLinkUrlChanged ||
        isDoneChanged,
    );
  }, [title, goal, fileUrl, linkUrl, done, todo]);

  return {
    done,
    title,
    goal,
    fileUrl,
    linkUrl,
    isModified,
    setDone,
    setTitle,
    setGoal,
    setFileUrl,
    setLinkUrl,
  };
}

export default useTodoDetail;
