export default function TaskCard({ task, onDragStart, onDelete }) {
    return (
        <div
            className="task-card glass-panel"
            draggable
            onDragStart={(e) => onDragStart(e, task.id)}
        >
            <div className="task-content">
                <p className="task-title">{task.title}</p>
                {task.description && <p className="task-desc">{task.description}</p>}
            </div>
            <button
                className="delete-btn"
                onClick={() => onDelete(task.id)}
                aria-label="Delete task"
            >
                ×
            </button>
        </div>
    );
}
