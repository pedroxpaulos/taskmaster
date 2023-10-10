import React from 'react';

const TaskCard = (props) => {
	return (
		<div
			name="TaskCard"
			className="w-full p-6 mt-2 bg-slate-300 text-white border-b-1 border-gray-300"
		>
			<div className="flex flex-row p-6 justify-content items-center space-x-2">
				<p
					name="title"
					className="text-4xl font-bold text-black tracking-wider"
				>
					{props.title}
				</p>
				<p name="description" className="text-4xl font-extralight">
					{props.description}
				</p>
				<p name="dueDate" className="text-4xl font-medium">
					{props.dueDate}
				</p>
				<p name="status" className="text-4xl font-medium">
					{props.status}
				</p>
				<p name="priority" className="text-4xl font-light">
					{props.priority}
				</p>
			</div>
		</div>
	);
};

export default TaskCard;
