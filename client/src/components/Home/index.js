import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { baseURL } from '../../Urls';
import { MdOutlineModeEdit } from "react-icons/md";
import { IoTrashBin } from "react-icons/io5";
import './index.css';
import Navbar from '../Navbar';

const Home = () => {
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('Pending'); // Default status is "Pending"
  const [allTodos, setAllTodos] = useState([]);
  const [editTodoId, setEditTodoId] = useState(null); // State to manage which todo is being edited

  useEffect(() => {
    fetchTodoData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editTodoId) {
        // Update existing todo
        await axios.put(`${baseURL}/todo/${editTodoId}`, {
          description,
          status
        });
        console.log('Todo updated successfully');
        setEditTodoId(null); // Reset edit state
      } else {
        // Create new todo
        await axios.post(`${baseURL}/todo`, {
          description,
          status
        });
        console.log('Todo created successfully');
      }
      fetchTodoData(); // Fetch todos again to update the UI
      // Clear form fields
      setDescription('');
      setStatus('Pending'); // Reset status to default
    } catch (error) {
      console.error('Error saving todo:', error);
    }
  };

  const fetchTodoData = async () => {
    try {
      const response = await axios.get(`${baseURL}/getAllTodos`);
      setAllTodos(response.data); // No need for update key anymore
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`${baseURL}/todo/${id}`);
      console.log('Todo deleted successfully');
      fetchTodoData();
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  const editTodo = (todo) => {
    setEditTodoId(todo.id); // Set the id of the todo being edited
    setDescription(todo.description); // Populate the description
    setStatus(todo.status); // Populate the status
  };

  const getStatusClassName = (status) => {
    switch (status) {
      case 'Pending':
        return 'status-pending';
      case 'Completed':
        return 'status-completed';
      case 'Ongoing':
        return 'status-ongoing';
      default:
        return '';
    }
  };

  return (
    <div className='main'>
      <Navbar />
      <form onSubmit={handleSubmit}>
        <div className='form-row'>
          <div className='form-control'>
            <label htmlFor="description">Description</label>
            <input
              type="text"
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          <div className='form-control'>
            <label htmlFor="status">Status</label>
            <select
              id="status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              required
            >
              <option value="Ongoing">Ongoing</option>
              <option value="Pending">Pending</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
          <button type="submit">{editTodoId ? 'Update Todo' : 'Add Todo'}</button>
        </div>
      </form>
      <div className='todo-items-con'>
        {allTodos.map(each => (
          <div key={each.id} className='todo-item'>
            <p>{each.description}</p>
            <div className='status-and-button'>
              <p  className={`status ${getStatusClassName(each.status)}`}>{each.status}</p>
              <button onClick={() => editTodo(each)}><MdOutlineModeEdit /></button>
              <button onClick={() => deleteTodo(each.id)}><IoTrashBin /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
