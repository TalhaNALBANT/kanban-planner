import { useState, useEffect } from 'react';
import Column from './Column';
import TaskModal from './TaskModal';

const COLUMNS = ["Backlog", "Todo", "In Progress", "Done"];

export default function Board() {
    const [tasks, setTasks] = useState(() => {
        const saved = localStorage.getItem('kanban-tasks');
        if (saved) {
            try {
                return JSON.parse(saved);
            } catch (e) {
                return [];
            }
        }
        return [
            { id: '1', title: 'Learn Vite & React', description: '', status: 'Done', priority: 'High', tags: ['documentation'], assignee: 'Alex', dueDate: '2024-01-10' },
            { id: '2', title: 'Implement CSS variables', description: 'Setup color themes', status: 'In Progress', priority: 'Medium', tags: ['styling', 'feature'], assignee: 'Sarah', dueDate: '' },
            { id: '3', title: 'Create Drag & Drop feature', description: '', status: 'Todo', priority: 'High', tags: ['feature', 'core'], assignee: '', dueDate: '' }
        ];
    });

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [activeColumn, setActiveColumn] = useState(null);

    useEffect(() => {
        localStorage.setItem('kanban-tasks', JSON.stringify(tasks));
    }, [tasks]);

    const handleDragStart = (e, taskId) => {
        e.dataTransfer.setData("taskId", taskId);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleDrop = (e, status) => {
        e.preventDefault();
        const taskId = e.dataTransfer.getData("taskId");

        setTasks(prevTasks => prevTasks.map(task => {
            if (task.id === taskId) {
                return { ...task, status: status };
            }
            return task;
        }));
    };

    const openAddTaskModal = (status) => {
        setActiveColumn(status);
        setIsModalOpen(true);
    };

    const handleSaveTask = (taskData) => {
        const newTask = {
            id: crypto.randomUUID(),
            title: taskData.title.trim(),
            description: taskData.description.trim(),
            status: activeColumn,
            priority: taskData.priority,
            tags: taskData.tags ? taskData.tags.split(',').map(t => t.trim()).filter(Boolean) : [],
            assignee: taskData.assignee.trim(),
            dueDate: taskData.dueDate
        };

        setTasks([...tasks, newTask]);
        setIsModalOpen(false);
    };

    const deleteTask = (taskId) => {
        if (window.confirm("Are you sure you want to delete this task?")) {
            setTasks(tasks.filter(t => t.id !== taskId));
        }
    };

    const handleMoveTask = (taskId, newStatus) => {
        setTasks(prevTasks => prevTasks.map(task => {
            if (task.id === taskId) {
                return { ...task, status: newStatus };
            }
            return task;
        }));
    };

    return (
        <>
            <div className="board">
                {COLUMNS.map(col => (
                    <Column
                        key={col}
                        title={col}
                        tasks={tasks.filter(t => t.status === col)}
                        onDragStart={handleDragStart}
                        onDragOver={handleDragOver}
                        onDrop={handleDrop}
                        onAddTask={() => openAddTaskModal(col)}
                        onDeleteTask={deleteTask}
                        allColumns={COLUMNS}
                        onMoveTask={handleMoveTask}
                    />
                ))}
            </div>

            {isModalOpen && (
                <TaskModal
                    columnName={activeColumn}
                    onClose={() => setIsModalOpen(false)}
                    onSave={handleSaveTask}
                />
            )}
        </>
    );
}
