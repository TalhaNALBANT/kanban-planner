export default function TaskCard({ task, onDragStart, onDelete, allColumns, onMoveTask }) {
    return (
        <div
            className="task-card glass-panel"
            draggable
            onDragStart={(e) => onDragStart(e, task.id)}
        >
            <div className="task-content">
                <div className="task-header">
                    <p className="task-title">{task.title}</p>
                    <button
                        className="delete-btn"
                        onClick={() => onDelete(task.id)}
                        aria-label="Delete task"
                    >
                        ×
                    </button>
                </div>
                {task.tags && task.tags.length > 0 && (
                    <div className="task-tags">
                        {task.tags.map(tag => (
                            <span key={tag} className="tag">{tag}</span>
                        ))}
                    </div>
                )}
                {task.description && <p className="task-desc">{task.description}</p>}

                <div className="task-meta">
                    {task.priority && (
                        <span className={`priority-badge priority-${task.priority.toLowerCase()}`}>
                            {task.priority}
                        </span>
                    )}
                    {task.dueDate && (
                        <span className="due-date">📅 {new Date(task.dueDate).toLocaleDateString()}</span>
                    )}
                    {task.assignee && (
                        <span className="assignee">👤 {task.assignee}</span>
                    )}
                </div>
                <div className="task-footer">
                    <select
                        className="status-select"
                        value={task.status}
                        onChange={(e) => onMoveTask(task.id, e.target.value)}
                        onPointerDown={(e) => e.stopPropagation()}
                        onMouseDown={(e) => e.stopPropagation()}
                    >
                        {allColumns.map(col => (
                            <option key={col} value={col}>{col}</option>
                        ))}
                    </select>
                </div>
            </div>
        </div>
    );
}
