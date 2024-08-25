import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TbTrashFilled } from "react-icons/tb";
import styled from "styled-components";
import { PiPencilSimpleLineFill } from "react-icons/pi";

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;    

const StyledTrashIcon = styled(TbTrashFilled)`
  color: ${({ clicked, hovered }) =>
    clicked ? 'rgb(43, 154, 154)' : hovered ? 'rgb(29, 173, 173)' : 'rgb(55, 202, 202)'};
  font-size: 24px;
`;                

const StyledPencilIcon = styled(PiPencilSimpleLineFill)`
  color: ${({ clicked, hovered }) =>
    clicked ? 'rgb(43, 154, 154)' : hovered ? 'rgb(29, 173, 173)' : 'rgb(55, 202, 202)'};
  font-size: 24px;
`;

const User = () => {
  const [clickedTrash, setClickedTrash] = useState({});
  const [clickedPencil, setClickedPencil] = useState({});
  const [hoveredTrash, setHoveredTrash] = useState({});
  const [hoveredPencil, setHoveredPencil] = useState({});

  const [taskData, setTaskData] = useState({
    title: '',
    description: '',
    dueDate: '',
    completed: false,
  });

  const handleTrashClick = (id) => {
    setClickedTrash((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handlePencilClick = (id) => {
    setClickedPencil((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTaskData({
      ...taskData,
      [name]: name === 'completed' ? e.target.checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${apiBaseUrl}/api/tasks`, taskData);
      console.log('Task created:', response.data);
      // Clear form fields after submission
      setTaskData({ title: '', description: '', dueDate: '', completed: false });
    } catch (error) {
      console.error('Error creating task', error);
    }
  };

  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get(`${apiBaseUrl}/api/tasks`);
        setTasks(response.data.tasks);
      }
      catch (error) {
        console.error("Error fetching data", error);
      }
    };
    fetchTasks();
  }, [])



  return (
    <div className='form--task'>
      <form className='form' onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={taskData.title}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={taskData.description}
          onChange={handleChange}
          required
        />
        <input
          type="date"
          name="dueDate"
          placeholder="Due Date"
          value={taskData.dueDate}
          onChange={handleChange}
          required
        />
        <label>
          <input
            type="checkbox"
            name="completed"
            checked={taskData.completed}
            onChange={handleChange}
          /> Completed
        </label>
        <button type="submit">Submit</button>
      </form>

      {/* Commented out the task listing section */}
      <div className='task--outer'>
        <table className='task-table'>
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Due Date</th>
              <th>Completed</th>
              <th>Operations</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <tr key={task._id}>
                <td>{task.title}</td>
                <td>{task.description}</td>
                <td>{new Date(task.dueDate).toLocaleDateString()}</td>
                <td>{task.completed ? 'Yes' : 'No'}</td>
                <td>
                  <button onClick={() => handleTrashClick(task._id)}>
                    <StyledTrashIcon
                      clicked={clickedTrash[task._id]}
                      hovered={hoveredTrash[task._id]}
                    />
                  </button>
                  <button onClick={() => handlePencilClick(task._id)}>
                    <StyledPencilIcon
                      clicked={clickedPencil[task._id]}
                      hovered={hoveredPencil[task._id]}
                    />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default User;
