const express = require('express');
const router = express.Router();
const Task = require('../models/Task.model'); // Import the Task model

// Create a new task
router.post('/tasks', async (req, res) => {
	try {
		const task = new Task(req.body); // Create a new task using the request body
		await task.save(); // Save the task to the database
		res.status(201).send(task); // Respond with the created task
	} catch (error) {
		res.status(400).send(error); // Handle any validation or server errors
	}
});

// Get all tasks
router.get('/tasks', async (req, res) => {
	try {
		const tasks = await Task.find(); // Retrieve all tasks from the database
		res.send(tasks); // Respond with the list of tasks
	} catch (error) {
		res.status(500).send(error); // Handle server errors
	}
});

// Get a single task by ID
router.get('/tasks/:id', async (req, res) => {
	const taskId = req.params.id;
	try {
		const task = await Task.findById(taskId); // Find a task by its ID
		if (!task) {
			return res.status(404).send(); // Task not found
		}
		res.send(task); // Respond with the task
	} catch (error) {
		res.status(500).send(error); // Handle server errors
	}
});

// Update a task by ID
router.patch('/tasks/:id', async (req, res) => {
	const taskId = req.params.id;
	const updates = req.body;

	try {
		const task = await Task.findByIdAndUpdate(taskId, updates, { new: true }); // Find and update a task by its ID
		if (!task) {
			return res.status(404).send(); // Task not found
		}
		res.send(task); // Respond with the updated task
	} catch (error) {
		res.status(400).send(error); // Handle validation or server errors
	}
});

// Delete a task by ID
router.delete('/tasks/:id', async (req, res) => {
	const taskId = req.params.id;

	try {
		const task = await Task.findByIdAndDelete(taskId); // Find and delete a task by its ID
		if (!task) {
			return res.status(404).send(); // Task not found
		}
		res.send(task); // Respond with the deleted task
	} catch (error) {
		res.status(500).send(error); // Handle server errors
	}
});

module.exports = router;
