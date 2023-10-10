import React from 'react';
import axios from 'axios';
import { useState } from 'react';

const NewTask = (props) => {
	const [task, setTask] = useState({});
	const handleSubmit = (e) => {
		e.preventDefault();

		const requestBody = { task };
		// Get the token from the localStorage
		// Send the token through the request "Authorization" Headers
		axios
			.post(`${process.env.REACT_APP_SERVER_URL}/api/taks`, requestBody)
			.then((response) => {
				// Reset the state
				console.log(response);
				setTask({});
				props.refreshShows();
			})
			.catch((error) => console.log(error));
	};
	return (
		<div className="bg-slate-50">
			<form>
				<label>
					Title:
					<input
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
				<label>
					Title:
					<input
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
				<input type="submit" value="Submit" onSubmit={handleSubmit} />
			</form>
		</div>
	);
};

export default NewTask;
