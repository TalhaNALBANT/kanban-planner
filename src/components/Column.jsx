import { useState, useRef, useEffect } from 'react';
import TaskCard from './TaskCard';

export default function Column({ title, tasks, onDragStart, onDragOver, onDrop, onAddTask, onDeleteTask, allColumns, onMoveTask, onEditColumn, onEditTask }) {
    const [isEditing, setIsEditing] = useState(false);
    const [editValue, setEditValue] = useState(title);
    const inputRef = useRef(null);

    useEffect(() => {
        if (isEditing && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isEditing]);

    const handleSave = () => {
        const newTitle = editValue.trim();
        if (newTitle && newTitle !== title) {
            if (!allColumns.includes(newTitle)) {
                onEditColumn(title, newTitle);
            } else {
                setEditValue(title); // revert if name taken
            }
        } else {
            setEditValue(title);
        }
        setIsEditing(false);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') handleSave();
        if (e.key === 'Escape') {
            setEditValue(title);
            setIsEditing(false);
        }
    };

    return (
        <div
            className="column glass-panel"
            onDragOver={onDragOver}
            onDrop={(e) => onDrop(e, title)}
        >
            <div className="column-header">
                {isEditing ? (
                    <input
                        ref={inputRef}
                        type="text"
                        className="column-title-input"
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                        onBlur={handleSave}
                        onKeyDown={handleKeyDown}
                        maxLength={25}
                    />
                ) : (
                    <h3 onClick={() => setIsEditing(true)} title="Click to edit column name">{title}</h3>
                )}
                <span className="task-count">{tasks.length}</span>
            </div>

            <div className="task-list">
                {tasks.map(task => (
                    <TaskCard
                        key={task.id}
                        task={task}
                        onDragStart={onDragStart}
                        onDelete={onDeleteTask}
                        allColumns={allColumns}
                        onMoveTask={onMoveTask}
                        onEdit={() => onEditTask(task)}
                    />
                ))}
            </div>

            <button className="add-task-btn" onClick={onAddTask}>
                + Add Task
            </button>
        </div>
    );
}
