import { useState } from 'react';

export default function TaskModal({ columnName, onClose, onSave }) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [priority, setPriority] = useState('Medium');
    const [tags, setTags] = useState('');
    const [assignee, setAssignee] = useState('');
    const [dueDate, setDueDate] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title.trim()) return;

        onSave({ title, description, priority, tags, assignee, dueDate });
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content glass-panel">
                <div className="modal-header">
                    <h3>Add Task to {columnName}</h3>
                    <button className="close-modal-btn" onClick={onClose}>×</button>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Task Title</label>
                        <input
                            type="text"
                            className="modal-input"
                            placeholder="e.g., Fix navigation bug"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            autoFocus
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Description (Optional)</label>
                        <textarea
                            className="modal-input"
                            rows="3"
                            placeholder="Add more details about this task..."
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label>Priority</label>
                            <select
                                className="modal-input"
                                value={priority}
                                onChange={(e) => setPriority(e.target.value)}
                            >
                                <option value="Low">Low</option>
                                <option value="Medium">Medium</option>
                                <option value="High">High</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label>Due Date</label>
                            <input
                                type="date"
                                className="modal-input"
                                value={dueDate}
                                onChange={(e) => setDueDate(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label>Assignee</label>
                            <input
                                type="text"
                                className="modal-input"
                                placeholder="e.g., Alex"
                                value={assignee}
                                onChange={(e) => setAssignee(e.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <label>Tags (Comma separated)</label>
                            <input
                                type="text"
                                className="modal-input"
                                placeholder="e.g., bug, ui"
                                value={tags}
                                onChange={(e) => setTags(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="modal-actions">
                        <button type="button" className="btn-cancel" onClick={onClose}>Cancel</button>
                        <button type="submit" className="btn-save">Save Task</button>
                    </div>
                </form>
            </div>
        </div>
    );
}
