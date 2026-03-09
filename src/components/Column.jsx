import TaskCard from './TaskCard';

export default function Column({ title, tasks, onDragStart, onDragOver, onDrop, onAddTask, onDeleteTask, allColumns, onMoveTask }) {
    return (
        <div
            className="column glass-panel"
            onDragOver={onDragOver}
            onDrop={(e) => onDrop(e, title)}
        >
            <div className="column-header">
                <h3>{title}</h3>
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
                    />
                ))}
            </div>

            <button className="add-task-btn" onClick={onAddTask}>
                + Add Task
            </button>
        </div>
    );
}
