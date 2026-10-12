import React, { useState, useEffect } from 'react';
import { useAuth } from '../auth/AuthContext';
import { TaskItem } from '../components/TaskItem';

export const Tasks = () => {
  const { user } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all'); // 'all' | 'active' | 'completed'
  const [updatingTaskId, setUpdatingTaskId] = useState(null);

  // Состояние для нового задания
  const [newTaskTitle, setNewTaskTitle] = useState('');

  useEffect(() => {
    if (!user?.id) return;

    setLoading(true);
    setError(null);

    fetch(`https://jsonplaceholder.typicode.com/todos?userId=${user.id}`)
      .then((res) => {
        if (!res.ok) throw new Error('Помилка при завантаженні завдань');
        return res.json();
      })
      .then((data) => {
        setTasks(data);
      })
      .catch((err) => {
        setError(err.message || 'Мережева помилка');
      })
      .finally(() => {
        setLoading(false);
      });
  }, [user?.id]);

  // Добавление локального задания без отправки на сервер
  const handleAddTask = (e) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;

    const newTask = {
      id: Date.now(), // Уникальный ID для локального состояния
      userId: user.id,
      title: newTaskTitle.trim(),
      completed: false,
    };

    setTasks((prevTasks) => [newTask, ...prevTasks]);
    setNewTaskTitle('');
  };

  const handleToggleStatus = async (taskId, newStatus) => {
    setUpdatingTaskId(taskId);

    // Если задание создано локально (ID сгенерирован через Date.now()), меняем статус только в состоянии
    const isLocalTask = typeof taskId === 'number' && taskId > 200;

    if (isLocalTask) {
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === taskId ? { ...task, completed: newStatus } : task
        )
      );
      setUpdatingTaskId(null);
      return;
    }

    try {
      const res = await fetch(`https://jsonplaceholder.typicode.com/todos/${taskId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ completed: newStatus }),
      });

      if (!res.ok) throw new Error('Не вдалося оновити статус');

      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === taskId ? { ...task, completed: newStatus } : task
        )
      );
    } catch (err) {
      alert('Помилка змінення статусу завдання!');
    } finally {
      setUpdatingTaskId(null);
    }
  };

  // Вычисление статистики
  const total = tasks.length;
  const completedCount = tasks.filter((t) => t.completed).length;
  const activeCount = total - completedCount;

  // Фильтрация
  const filteredTasks = tasks.filter((t) => {
    if (filter === 'active') return !t.completed;
    if (filter === 'completed') return t.completed;
    return true;
  });

  return (
    <div className="page">
      <h1>Мої завдання</h1>

      {/* Форма добавления нового задания */}
      <form onSubmit={handleAddTask} className="add-task-form">
        <input
          type="text"
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
          placeholder="Введіть назву нового завдання..."
          className="add-task-input"
        />
        <button type="submit" className="btn-add">
          Додати
        </button>
      </form>

      {loading && <div className="loader">Завантаження завдань...</div>}
      {error && <div className="error-banner">{error}</div>}

      {!loading && !error && (
        <>
          <div className="controls">
            <div className="filters">
              <button
                className={filter === 'all' ? 'active' : ''}
                onClick={() => setFilter('all')}
              >
                Усі
              </button>
              <button
                className={filter === 'active' ? 'active' : ''}
                onClick={() => setFilter('active')}
              >
                Активні
              </button>
              <button
                className={filter === 'completed' ? 'active' : ''}
                onClick={() => setFilter('completed')}
              >
                Виконані
              </button>
            </div>

            <div className="stats">
              Усього: {total} | Виконано: {completedCount} | Залишилося: {activeCount}
            </div>
          </div>

          {filteredTasks.length === 0 ? (
            <div className="empty-state">Завдань не знайдено.</div>
          ) : (
            <ul className="task-list">
              {filteredTasks.map((task) => (
                <TaskItem
                  key={task.id}
                  task={task}
                  onToggleStatus={handleToggleStatus}
                  isUpdating={updatingTaskId === task.id}
                />
              ))}
            </ul>
          )}
        </>
      )}
    </div>
  );
};