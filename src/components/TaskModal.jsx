import { useState } from 'react';

export default function TaskModal({ columnName, onClose, onSave, availableTags = [] }) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [priority, setPriority] = useState('Medium');
    const [selectedTags, setSelectedTags] = useState([]);
    const [newTagInput, setNewTagInput] = useState('');
    const [dueDate, setDueDate] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title.trim()) return;

        onSave({ title, description, priority, tags: selectedTags, dueDate });
    };

    const toggleTag = (tag) => {
        if (selectedTags.includes(tag)) {
            setSelectedTags(selectedTags.filter(t => t !== tag));
        } else {
            setSelectedTags([...selectedTags, tag]);
        }
    };

    const handleAddCustomTag = (e) => {
        e.preventDefault();
        const tag = newTagInput.trim();
        if (tag && !selectedTags.includes(tag)) {
            setSelectedTags([...selectedTags, tag]);
        }
        setNewTagInput('');
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
                            placeholder="e.g., Grocery shopping"
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
                        <div className="form-group" style={{ flex: 'none', width: '100%' }}>
                            <label>Tags</label>

                            <div className="tags-container">
                                {availableTags.map(tag => (
                                    <button
                                        type="button"
                                        key={tag}
                                        className={`tag-toggle ${selectedTags.includes(tag) ? 'selected' : ''}`}
                                        onClick={() => toggleTag(tag)}
                                    >
                                        {tag}
                                    </button>
                                ))}
                                {selectedTags.filter(t => !availableTags.includes(t)).map(tag => (
                                    <button
                                        type="button"
                                        key={tag}
                                        className="tag-toggle selected"
                                        onClick={() => toggleTag(tag)}
                                    >
                                        {tag}
                                    </button>
                                ))}
                            </div>

                            <div className="add-tag-group">
                                <input
                                    type="text"
                                    className="modal-input"
                                    placeholder="Add custom tag (press Enter)"
                                    value={newTagInput}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                            e.preventDefault();
                                            handleAddCustomTag(e);
                                        }
                                    }}
                                    onChange={(e) => setNewTagInput(e.target.value)}
                                />
                                <button type="button" className="btn-add-tag" onClick={handleAddCustomTag}>Add Tag</button>
                            </div>
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
