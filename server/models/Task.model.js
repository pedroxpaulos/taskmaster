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
		required: true,
	},
	status: {
		type: String,
		enum: ['Incomplete', 'In Progress', 'Completed'],
		default: 'Incomplete',
	},
	priority: {
		type: String,
		enum: ['Low', 'Medium', 'High'],
		default: 'Medium',
	},
	createdBy: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true,
	},
	// You can add more fields as needed, such as assignedTo, project, etc.
});

// Create the Task model using the schema
const Task = mongoose.model('Task', taskSchema);

// Export the Task model
module.exports = Task;
