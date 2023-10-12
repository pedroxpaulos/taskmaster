import React from 'react';
import moment from 'moment';
import axios from 'axios';
import { LuDelete } from 'react-icons/lu';

const handleClick = (event) => {
	console.log(event.detail);
	switch (event.detail) {
		case 1: {
			console.log('single click');
			break;
		}
		case 2: {
			console.log('double click');
			break;
		}
		default: {
			break;
		}
	}
};

const TaskCard = (props) => {
	const thisDate = moment(props.dueDate).format('DD/MM/YYYY');

	const deleteTask = (taskId) => {
		axios
			.delete(`${process.env.REACT_APP_SERVER_URL}/api/tasks/${taskId}`)
			.then(() => {
				window.location.reload(false);
			})
			.catch((err) => console.log(err));
	};

	return (
		<div
			name="TaskCard"
			onClick={handleClick}
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
		</div>
	);
};

export default TaskCard;
