import { useState, useEffect } from 'react';
import Column from './Column';

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
            { id: '1', title: 'Learn Vite & React', status: 'Done' },
            { id: '2', title: 'Implement CSS variables', status: 'In Progress' },
            { id: '3', title: 'Create Drag & Drop feature', status: 'Todo' }
        ];
    });

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

    const addTask = (status) => {
        const title = window.prompt("Enter task details:");
        if (!title || title.trim() === '') return;

        const newTask = {
            id: crypto.randomUUID(),
            title: title.trim(),
            status
        };

        setTasks([...tasks, newTask]);
    };

    const deleteTask = (taskId) => {
        if (window.confirm("Are you sure you want to delete this task?")) {
            setTasks(tasks.filter(t => t.id !== taskId));
        }
    };

    return (
        <div className="board">
            {COLUMNS.map(col => (
                <Column
                    key={col}
                    title={col}
                    tasks={tasks.filter(t => t.status === col)}
                    onDragStart={handleDragStart}
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                    onAddTask={() => addTask(col)}
                    onDeleteTask={deleteTask}
                />
            ))}
        </div>
    );
}
