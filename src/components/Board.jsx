import { useState, useEffect } from 'react';
import Column from './Column';
import TaskModal from './TaskModal';

export default function Board() {
    const [columns, setColumns] = useState(() => {
        const saved = localStorage.getItem('kanban-columns');
        if (saved) {
            try {
                return JSON.parse(saved);
            } catch (e) {
                return [];
            }
        }
        return ["Ideas", "To Do", "In Progress", "Done"];
    });

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
            { id: '1', title: 'Morning Run', description: '30 mins in the park', status: 'Done', priority: 'High', tags: ['Health', 'Personal'], dueDate: new Date().toISOString().split('T')[0] },
            { id: '2', title: 'Grocery Shopping', description: 'Milk, Eggs, Bread, Coffee', status: 'In Progress', priority: 'Medium', tags: ['Shopping', 'Home'], dueDate: '' },
            { id: '3', title: 'Read 20 pages', description: 'Finish the current chapter', status: 'To Do Today', priority: 'Low', tags: ['Personal', 'Hobby'], dueDate: '' }
        ];
    });

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [activeColumn, setActiveColumn] = useState(null);
    const [editingTask, setEditingTask] = useState(null);

    const [availableTags, setAvailableTags] = useState(() => {
        const saved = localStorage.getItem('kanban-tags');
        if (saved) {
            try {
                return JSON.parse(saved);
            } catch (e) {
                return [];
            }
        }
        return ['Personal', 'Work', 'Health', 'Shopping', 'Home', 'Hobby'];
    });

    useEffect(() => {
        localStorage.setItem('kanban-tasks', JSON.stringify(tasks));
    }, [tasks]);

    useEffect(() => {
        localStorage.setItem('kanban-tags', JSON.stringify(availableTags));
    }, [availableTags]);

    useEffect(() => {
        localStorage.setItem('kanban-columns', JSON.stringify(columns));
    }, [columns]);

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
        setEditingTask(null);
        setIsModalOpen(true);
    };

    const openEditTaskModal = (task) => {
        setEditingTask(task);
        setActiveColumn(task.status);
        setIsModalOpen(true);
    };

    const handleSaveTask = (taskData) => {
        const newTags = taskData.tags || [];

        const updatedTags = [...new Set([...availableTags, ...newTags])];
        if (updatedTags.length !== availableTags.length) {
            setAvailableTags(updatedTags);
        }

        if (editingTask) {
            setTasks(prevTasks => prevTasks.map(t =>
                t.id === editingTask.id
                    ? {
                        ...t,
                        title: taskData.title.trim(),
                        description: taskData.description.trim(),
                        priority: taskData.priority,
                        tags: newTags,
                        dueDate: taskData.dueDate
                    }
                    : t
            ));
        } else {
            const newTask = {
                id: crypto.randomUUID(),
                title: taskData.title.trim(),
                description: taskData.description.trim(),
                status: activeColumn,
                priority: taskData.priority,
                tags: newTags,
                dueDate: taskData.dueDate
            };
            setTasks([...tasks, newTask]);
        }

        setIsModalOpen(false);
        setEditingTask(null);
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

    const handleEditColumn = (oldName, newName) => {
        if (!newName || oldName === newName) return;

        setColumns(cols => cols.map(c => c === oldName ? newName : c));

        setTasks(prevTasks => prevTasks.map(task =>
            task.status === oldName ? { ...task, status: newName } : task
        ));
    };

    return (
        <>
            <div className="board">
                {columns.map(col => (
                    <Column
                        key={col}
                        title={col}
                        tasks={tasks.filter(t => t.status === col)}
                        onDragStart={handleDragStart}
                        onDragOver={handleDragOver}
                        onDrop={handleDrop}
                        onAddTask={() => openAddTaskModal(col)}
                        onDeleteTask={deleteTask}
                        allColumns={columns}
                        onMoveTask={handleMoveTask}
                        onEditColumn={handleEditColumn}
                        onEditTask={openEditTaskModal}
                    />
                ))}
            </div>

            {isModalOpen && (
                <TaskModal
                    columnName={activeColumn}
                    availableTags={availableTags}
                    initialData={editingTask}
                    onClose={() => setIsModalOpen(false)}
                    onSave={handleSaveTask}
                />
            )}
        </>
    );
}
