// Import the necessary modules
const mongoose = require('mongoose');

// Define the task schema
const taskSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
		trim: true,
	},
	description: {
		type: String,
		required: true,
		trim: true,
	},
	dueDate: {
		type: Date,
		default: Date.now,
		required: true,
	},
	status: {
		type: String,
		enum: ['Incomplete', 'In Progress', 'Completed'],
		default: 'Incomplete',
		required: true,
	},
	priority: {
		type: String,
		enum: ['Low', 'Medium', 'High'],
		default: 'Medium',
		required: true,
	},
	// You can add more fields as needed, such as assignedTo, project, etc.
});

// Create the Task model using the schema
const Task = mongoose.model('Task', taskSchema);

// Export the Task model
module.exports = Task;
