import React from 'react';

export const TaskItem = ({ task, onToggleStatus, isUpdating }) => {
  return (
    <li className={`task-item ${task.completed ? 'completed' : ''}`}>
      <span className="task-title">{task.title}</span>
      <div className="task-actions">
        <span className={`status-badge ${task.completed ? 'done' : 'pending'}`}>
          {task.completed ? 'Виконано' : 'Не виконано'}
        </span>
        <button
          onClick={() => onToggleStatus(task.id, !task.completed)}
          disabled={isUpdating}
          className="btn-toggle"
        >
          {isUpdating ? 'Оновлення...' : 'Змінити статус'}
        </button>
      </div>
    </li>
  );
};