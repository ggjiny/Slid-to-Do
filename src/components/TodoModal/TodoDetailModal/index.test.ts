import { Todo } from '@/types/interface';
import useDeleteTodo from '@hooks/api/todosAPI/useDeleteTodo';
import usePatchTodo from '@hooks/api/todosAPI/usePatchTodo';
import { act, renderHook } from '@testing-library/react';
import { ChangeEvent } from 'react';
import useTodoDetail from './useTodoDetail';

jest.mock('@hooks/api/todosAPI/useDeleteTodo');
jest.mock('@hooks/api/todosAPI/usePatchTodo');

describe('TodoDetailModal hooks and functions', () => {
  const sampleTodo: Todo = {
    id: 1,
    title: 'Initial Title',
    goal: { id: 1, title: 'Initial Goal' },
    fileUrl: 'https://example.com/file.png',
    linkUrl: 'https://example.com',
    noteId: null,
    done: false,
    userId: 1,
    teamId: 'team1',
    createdAt: '2023-01-01T00:00:00Z',
    updatedAt: '2023-01-01T00:00:00Z',
  };

  const mockPatchTodo = jest.fn();
  const mockDeleteTodo = jest.fn();

  beforeEach(() => {
    (usePatchTodo as jest.Mock).mockReturnValue({ mutate: mockPatchTodo });
    (useDeleteTodo as jest.Mock).mockReturnValue({ mutate: mockDeleteTodo });
  });

  test('handleTitleChange updates the title state', () => {
    const { result } = renderHook(() => useTodoDetail(sampleTodo));

    const event = {
      target: { value: 'New Title' },
    } as ChangeEvent<HTMLInputElement>;

    act(() => {
      result.current.setTitle(event.target.value);
    });

    expect(result.current.title).toBe('New Title');
  });

  test('handleFileDelete resets the fileUrl and input field', () => {
    const { result } = renderHook(() => useTodoDetail(sampleTodo));

    act(() => {
      result.current.setFileUrl(null);
    });

    expect(result.current.fileUrl).toBeNull();
  });

  test('toggleDone toggles the done state', () => {
    const { result } = renderHook(() => useTodoDetail(sampleTodo));

    act(() => {
      result.current.setDone(!result.current.done);
    });

    expect(result.current.done).toBe(true);

    act(() => {
      result.current.setDone(!result.current.done);
    });

    expect(result.current.done).toBe(false);
  });

  test('handleSave calls editTodo API correctly', () => {
    const { result } = renderHook(() => useTodoDetail(sampleTodo));

    act(() => {
      result.current.setTitle('Updated Title');
      result.current.setGoal({ id: 2, title: 'Updated Goal' });
      result.current.setFileUrl('https://new-file.com/file.png');
      result.current.setLinkUrl('https://new-link.com');
      result.current.setDone(true);
    });

    const updatedTodo = {
      ...(result.current.title !== sampleTodo.title && {
        title: result.current.title,
      }),
      ...(result.current.goal?.id !== sampleTodo.goal?.id && {
        goalId: result.current.goal?.id ?? null,
      }),
      ...(result.current.fileUrl !== sampleTodo.fileUrl && {
        fileUrl: result.current.fileUrl,
      }),
      ...(result.current.linkUrl !== sampleTodo.linkUrl && {
        linkUrl: result.current.linkUrl,
      }),
      ...(result.current.done !== sampleTodo.done && {
        done: result.current.done,
      }),
    };

    act(() => {
      mockPatchTodo({
        todoId: sampleTodo.id,
        todo: updatedTodo,
      });
    });

    expect(mockPatchTodo).toHaveBeenCalledWith({
      todoId: sampleTodo.id,
      todo: updatedTodo,
    });
  });

  test('handleDelete calls removeTodo API correctly', () => {
    act(() => {
      mockDeleteTodo(sampleTodo.id);
    });

    expect(mockDeleteTodo).toHaveBeenCalledWith(sampleTodo.id);
  });

  test('isModified updates correctly based on changes', () => {
    const { result } = renderHook(() => useTodoDetail(sampleTodo));

    expect(result.current.isModified).toBe(false);

    act(() => {
      result.current.setTitle('Updated Title');
    });
    expect(result.current.isModified).toBe(true);

    act(() => {
      result.current.setTitle(sampleTodo.title);
    });
    expect(result.current.isModified).toBe(false);

    act(() => {
      result.current.setGoal({ id: 2, title: 'New Goal' });
    });
    expect(result.current.isModified).toBe(true);

    act(() => {
      result.current.setGoal(sampleTodo.goal);
    });
    expect(result.current.isModified).toBe(false);

    act(() => {
      result.current.setFileUrl('https://new-file.com/file.png');
    });
    expect(result.current.isModified).toBe(true);

    act(() => {
      result.current.setFileUrl(sampleTodo.fileUrl);
    });
    expect(result.current.isModified).toBe(false);

    act(() => {
      result.current.setDone(!sampleTodo.done);
    });
    expect(result.current.isModified).toBe(true);

    act(() => {
      result.current.setDone(sampleTodo.done);
    });
    expect(result.current.isModified).toBe(false);
  });
});
