import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './App.css';

const Todo = () => {
  const [add, setAdd] = useState([]);
  const [input, setInput] = useState('');
  const [search, setSearch] = useState('');
  const [completionMessage, setCompletionMessage] = useState('');
  const [zoom, setZoom] = useState(1);
  const [selectedDate, setSelectedDate] = useState(null);

  const itemAdd = () => {
    if (input.trim() !== '') {
      setAdd([...add, { text: input, isComplete: false, date: selectedDate }]);
      setInput('');
      setSelectedDate(null);
    }
  };

  const itemDelete = (index) => {
    const updateItem = [...add];
    updateItem.splice(index, 1);
    setAdd(updateItem);
  };

  const todoComplete = (index) => {
    const updateItem = [...add];
    updateItem[index].isComplete = !updateItem[index].isComplete;
    setAdd(updateItem);
    if (updateItem[index].isComplete) {
      setCompletionMessage('Your task is completed');
    } else {
      setCompletionMessage('');
    }
  };

  const todoSearch = add.filter((val) =>
    val.text.toLowerCase().includes(search.toLowerCase())
  );

  const zoomIn = () => {
    setZoom((prevZoom) => Math.min(prevZoom + 0.1, 2));
  };

  const zoomOut = () => {
    setZoom((prevZoom) => Math.max(prevZoom - 0.1, 0.5));
  };

  return (
    <div>
      <div className="zoom">
        <button onClick={zoomIn}>+</button>
        <button onClick={zoomOut}>-</button>
      </div>
      <div className="todo-container" style={{ transform: `scale(${zoom})` }}>
        <h1>Todo List</h1>
        <div className="input-container">
          <input
            type="text"
            placeholder="Enter a message"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <input
            type="text"
            placeholder="Search for message"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="search-input"
          />
        </div>
        <button onClick={itemAdd}>ADD</button>
        <div>
          {todoSearch.map((val, index) => (
            <div key={index} className="todo-item">
              <input
                type="checkbox"
                checked={val.isComplete}
                onChange={() => todoComplete(index)}
              />
              <span>{val.text}</span>
              {val.date && (
                <span className="todo-date">
                  {new Date(val.date).toLocaleDateString()}
                </span>
              )}
              <button onClick={() => itemDelete(index)}>Delete</button>
            </div>
          ))}
        </div>
        {completionMessage && <div className="completion-message">{completionMessage}</div>}
      </div>
      <div className="date-picker-container">
        <DatePicker
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          placeholderText="Select a date"
          className="date-picker"
        />
      </div>
    </div>
  );
};

export default Todo;
