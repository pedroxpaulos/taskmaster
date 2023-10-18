import React, { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';

export default function Modal({ task, isNewTask, onSave, onClose }) {
	const [showModal, setShowModal] = useState(false);
	const [editedTask, setEditedTask] = useState(task);
	const todayIs = new Date();
	const todaysDate = todayIs.toISOString().split('T')[0];

	useEffect(() => {
		if (task === undefined) {
			setEditedTask({});
		} else {
			// Format the dueDate to "yyyy-MM-dd" format if it's in ISO format
			if (task.dueDate && task.dueDate.includes('T')) {
				const isoDate = new Date(task.dueDate);
				const formattedDate = isoDate.toISOString().split('T')[0];
				setEditedTask({
					...task,
					dueDate: formattedDate,
				});
			} else {
				setEditedTask(task);
			}
		}

		if (onSave) {
			setShowModal(true);
		}
	}, [task]);

	const handleNewClose = () => {
		setShowModal(false);
		if (isNewTask === false) {
			onClose();
		}
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (isNewTask) {
			axios
				.post(`${process.env.REACT_APP_SERVER_URL}/api/tasks`, editedTask)
				.then((response) => {
					setEditedTask({});
					setShowModal(false);
				})
				.catch((error) => console.log(error));
		} else {
			axios
				.patch(
					`${process.env.REACT_APP_SERVER_URL}/api/tasks/${editedTask._id}`,
					editedTask
				)
				.then((response) => {
					// Close the modal
					setShowModal(false);
					// Callback to inform the parent component of the task update
					onSave(response.data);
				})
				.catch((error) => console.log(error));
		}
	};
	return (
		<>
			{isNewTask ? (
				<button
					className="text-black bg-gray-100 hover:bg-gray-300 focus:outline-none focus:ring-4 focus:ring-gray-300 font-extralight rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
					type="button"
					onClick={() => setShowModal(true)}
				>
					New Task
				</button>
			) : null}
			{showModal ? (
				<>
					<div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
						<div className="relative w-auto my-6 mx-auto max-w-3xl">
							{/*content*/}
							<div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
								{/*header*/}
								<div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
									<h3 className="text-3xl font-semibold">Task Information</h3>
									<button
										className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
										onClick={() => setShowModal(false)}
									>
										<span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
											×
										</span>
									</button>
								</div>
								{/*body*/}
								<div
									name="newTask"
									className="fborder-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none"
								>
									<form className="p-6">
										<label className="w-full pl-6 mr-6 text-2xl font-extralight text-black">
											Task
											<input
												required
												className="pl-6 text-2xl font-bold bg-slate-100 text-black"
												type="text"
												name="title"
												maxLength="50"
												placeholder="Your New Task"
												value={editedTask.title || ''}
												onChange={(e) =>
													setEditedTask((prevTask) => ({
														...prevTask,
														title: e.target.value,
													}))
												}
											/>
										</label>
										<label className="w-full pl-6 pr-6 text-2xl font-extralight text-black">
											Description:
											<input
												required
												className="pl-6 text-2xl font-bold bg-slate-100 text-black"
												type="text"
												name="description"
												maxLength="30"
												rows="5"
												cols="30"
												placeholder="Your Description"
												value={editedTask.description || ''}
												onChange={(e) =>
													setEditedTask((prevTask) => ({
														...prevTask,
														description: e.target.value,
													}))
												}
											/>
										</label>
										<label className="w-full pl-6 pr-6 text-2xl font-extralight text-black">
											Date:
											<input
												required
												className="pl-6 text-2xl font-bold bg-slate-100 text-black"
												type="date"
												name="date"
												min={todaysDate}
												value={editedTask.dueDate || todaysDate}
												onChange={(e) =>
													setEditedTask((prevTask) => ({
														...prevTask,
														dueDate: e.target.value,
													}))
												}
											/>
										</label>
										<label className="w-full pl-6 pr-6 text-2xl font-extralight text-black">
											Status
											<select
												id="status"
												className="pl-6 text-2xl font-bold bg-slate-100 text-black"
												value={editedTask.status || ''}
												onChange={(e) =>
													setEditedTask((prevTask) => ({
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
										<label className="w-full pl-6 pr-6 text-2xl font-extralight text-black">
											Priority
											<select
												id="priority"
												className="pl-6 text-2xl font-bold bg-slate-100 text-black"
												value={editedTask.priority || ''}
												onChange={(e) =>
													setEditedTask((prevTask) => ({
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
									</form>
								</div>

								{/*footer*/}
								<div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
									<button
										className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
										type="button"
										onClick={() => {
											handleNewClose();
										}}
									>
										Close
									</button>
									<button
										className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
										type="button"
										onClick={(e) => {
											e.preventDefault();
											handleNewClose();
											handleSubmit(e);
										}}
									>
										Save Changes
									</button>
								</div>
							</div>
						</div>
					</div>
					<div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
				</>
			) : null}
		</>
	);
}
