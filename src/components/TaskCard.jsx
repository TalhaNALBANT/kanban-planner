export default function TaskCard({ task, onDragStart, onDelete }) {
    return (
        <div
            className="task-card glass-panel"
            draggable
            onDragStart={(e) => onDragStart(e, task.id)}
        >
            <p>{task.title}</p>
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
