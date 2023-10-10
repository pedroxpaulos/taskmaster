import React from 'react';
import axios from 'axios';
import { useState } from 'react';

const NewTask = ({ onTaskSubmitted }) => {
	const [task, setTask] = useState({});
	const handleSubmit = (e) => {
		e.preventDefault();
		alert('here');
		axios
			.post(`${process.env.REACT_APP_SERVER_URL}/api/tasks`, task)
			.then((response) => {
				// Reset the state
				setTask({});
				onTaskSubmitted();
			})
			.catch((error) => console.log(error));
	};
	return (
		<div
			name="newTask"
			className="flex flex-row bg-slate-50 pt-20 m-1 w-full border-b-1 border-gray-300"
		>
			<form className="p-6">
				<label className="pl-6 mr-6 text-2xl font-extralight text-black">
					Task
					<input
						required
						className="pl-6 text-2xl font-bold bg-slate-100 text-black"
						type="text"
						name="title"
						maxLength="50"
						value={task.title || ''}
						onChange={(e) =>
							setTask((prevTask) => ({
								...prevTask,
								title: e.target.value,
							}))
						}
					/>
				</label>
				<label className="pl-6 pr-6 text-2xl font-extralight text-black">
					Description:
					<input
						required
						className="pl-6 text-2xl font-bold bg-slate-100 text-black"
						type="text"
						name="description"
						maxLength="30"
						rows="5"
						cols="30"
						value={task.description || ''}
						onChange={(e) =>
							setTask((prevTask) => ({
								...prevTask,
								description: e.target.value,
							}))
						}
					/>
				</label>
				<label className="pl-6 pr-6 text-2xl font-extralight text-black">
					Date:
					<input
						required
						className="pl-6 text-2xl font-bold bg-slate-100 text-black"
						type="date"
						name="description"
						maxLength="30"
						rows="5"
						cols="30"
						value={task.dueDate || ''}
						onChange={(e) =>
							setTask((prevTask) => ({
								...prevTask,
								dueDate: e.target.value,
							}))
						}
					/>
				</label>
				<label className="pl-6 pr-6 text-2xl font-extralight text-black">
					Status
					<select
						id="status"
						className="pl-6 text-2xl font-bold bg-slate-100 text-black"
						onChange={(e) =>
							setTask((prevTask) => ({
								...prevTask,
								status: e.target.value,
							}))
						}
					>
						<option value="Incomplete">Incomplete</option>
						<option value="In Progress">In Progress</option>
						<option value="Completed">Completed</option>
					</select>
				</label>
				<label className="pl-6 pr-6 text-2xl font-extralight text-black">
					Priority
					<select
						id="priority"
						className="pl-6 text-2xl font-bold bg-slate-100 text-black"
						onChange={(e) =>
							setTask((prevTask) => ({
								...prevTask,
								priority: e.target.value,
							}))
						}
					>
						<option value="Low">Low</option>
						<option value="Medium">Medium</option>
						<option value="High">High</option>
					</select>
				</label>
				<button
					className="pl-6 mr-6 text-2xl font-bold cursor-pointer hover:font-semibold text-black"
					type="submit"
					onClick={handleSubmit}
				>
					Submit
				</button>
				<button
					className="pl-6 mr-6 text-2xl font-bold cursor-pointer hover:font-semibold text-black"
					type="button"
					onClick={() => console.log(task)}
				></button>
			</form>
		</div>
	);
};

export default NewTask;
