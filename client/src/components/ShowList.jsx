import axios from 'axios';
import TaskCard from './TaskCard';
import { useState, useEffect } from 'react';

const ShowList = () => {
	const [tasks, setTasks] = useState([]);
	const getAllTasks = () => {
		axios
			.get(`${process.env.REACT_APP_SERVER_URL}/api/tasks`)
			.then((response) => {
				setTasks(response.data);
			})
			.catch((error) => console.log(error));
	};
	useEffect(() => {
		getAllTasks();
	}, []);
	return (
		<div>
			{tasks.map((task) => {
				return <TaskCard key={task._id} {...task} />;
			})}
		</div>
	);
};

export default ShowList;
