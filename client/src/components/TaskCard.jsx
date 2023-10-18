import React, { useState } from 'react';
import moment from 'moment';
import axios from 'axios';
import { LuDelete } from 'react-icons/lu';
import Modal from './Modal';

const TaskCard = (props) => {
	const [showModal, setShowModal] = useState(false);
	const [editedTask, setEditedTask] = useState({});

	const thisDate = moment(props.dueDate).format('DD/MM/YYYY');

	const deleteTask = (taskId) => {
		axios
			.delete(`${process.env.REACT_APP_SERVER_URL}/api/tasks/${taskId}`)
			.then(() => {
				window.location.reload(false);
			})
			.catch((err) => console.log(err));
	};

	const handleDoubleClick = () => {
		setShowModal(true);
		setEditedTask(props);
		console.log(showModal);
	};

	const handleCloseModal = () => {
		console.log('Closed' + showModal);
		setShowModal(false);
	};

	const handleTaskUpdate = (updatedTask) => {
		console.log('Updated Task:', updatedTask);
	};

	return (
		<div
			name="TaskCard"
			onDoubleClick={handleDoubleClick}
			className="w-full p-6 mt-2 bg-slate-300 text-white border-b-1 border-gray-300 select-none"
		>
			<div className="flex flex-row p-6 justify-content items-center space-x-2">
				<p name="dueDate" className="text-1xl font-extralight">
					{thisDate}
				</p>
				<p
					name="title"
					className="md:text-4xl font-bold text-black tracking-wider text-base"
				>
					{props.title}
				</p>
				<p name="description" className="md:text-4xl font-extralight text-sm">
					{props.description}
				</p>

				<p name="status" className="md:text-4xl font-medium text-sm">
					{props.status}
				</p>
				<p name="priority" className="md:text-4xl font-light text-sm">
					{props.priority}
				</p>
				<button
					className="text-black hover:text-gray-600"
					type="submit"
					onClick={(e) => {
						e.preventDefault();
						deleteTask(props._id);
					}}
				>
					<LuDelete size={30} />
				</button>
			</div>
			{showModal && (
				<Modal
					task={editedTask}
					isNewTask={false}
					onSave={handleTaskUpdate}
					onClose={handleCloseModal}
				/>
			)}
		</div>
	);
};

export default TaskCard;
