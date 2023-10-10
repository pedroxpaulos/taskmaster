import React, { useState } from 'react';
import Navbar from './components/Navbar';
import ShowList from './components/ShowList';
import NewTask from './components/NewTask';

function App() {
	const [updateTaskList, setUpdateTaskList] = useState(false);

	const handleTaskSubmitted = () => {
		setUpdateTaskList(!updateTaskList);
	};

	return (
		<div>
			<Navbar />
			<NewTask onTaskSubmitted={handleTaskSubmitted} />
			<ShowList key={updateTaskList} />
		</div>
	);
}

export default App;
