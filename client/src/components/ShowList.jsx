import axios from 'axios';
import TaskCard from './TaskCard';
import { useState, useEffect } from 'react';
import Modal from './Modal';

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

	const sortByStatus = () => {
		const sortedTasks = [...tasks];
		sortedTasks.sort((a, b) => {
			const statusOrder = ['Completed', 'In Progress', 'Incomplete'];
			return statusOrder.indexOf(a.status) - statusOrder.indexOf(b.status);
		});
		console.log(tasks);
		setTasks(sortedTasks);
	};

	const sortByPriority = () => {
		const sortedTasks = [...tasks];
		sortedTasks.sort((a, b) => {
			const priorityOrder = ['High', 'Medium', 'Low'];
			return (
				priorityOrder.indexOf(a.priority) - priorityOrder.indexOf(b.priority)
			);
		});
		setTasks(sortedTasks);
	};

	const sortByDate = () => {
		const sortedTasks = [...tasks];
		sortedTasks.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
		setTasks(sortedTasks);
	};

	return (
		<div className="pt-20">
			<form className="pl-6 pt-2 flex flex-col md:flex-row">
				<Modal task={{}} isNewTask={true} />

				<button
					className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-extralight rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
					onClick={sortByStatus}
				>
					Sort by Status
				</button>
				<button
					className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-extralight rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
					onClick={sortByPriority}
				>
					Sort by Priority
				</button>
				<button
					className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-extralight rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
					onClick={sortByDate}
				>
					Sort by Date
				</button>
				<button
					className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-extralight rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
					onClick={getAllTasks}
				>
					Sort by Creation Date
				</button>
			</form>

			{tasks.map((task) => {
				return <TaskCard key={task._id} {...task} />;
			})}
		</div>
	);
};

export default ShowList;
