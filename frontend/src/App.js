import { useEffect, useState } from 'react';
import AddTask from './components/AddTask';
import Header from './components/Header';
import Tasks from './components/Tasks';

function App() {
	const [showAddTask, setShowAddTask] = useState(false);
	const [tasks, setTasks] = useState([
		{
			id: 1,
			text: 'Doctors Appointment',
			day: 'Feb 5th at 2:30pm',
			reminder: true,
		},
		{
			id: 2,
			text: 'Meeting at School',
			day: 'Feb 6th at 1:30pm',
			reminder: false,
		},
		{
			id: 3,
			text: 'Shopping',
			day: 'Feb 5th at 5:30pm',
			reminder: true,
		},
	]);

	// PUT - Add Task
	const addTask = (task) => {
		const id = Math.floor(Math.random() * 10000) + 1;
		const newTask = { id, ...task };
		setTasks([...tasks, newTask]);
	};

	// DELETE - Delete Task
	const deleteTask = (id) => {
		setTasks(tasks.filter((task) => task.id !== id));
	};

	// PATCH - Toggle Reminder
	const toggleReminder = (id) => {
		setTasks(
			tasks.map((task) =>
				task.id === id ? { ...task, reminder: !task.reminder } : task
			)
		);
	};

	// Fetching title from backend API
	const [title, setTitle] = useState({});

	useEffect(() => {
		fetch('/title')
			.then((res) => res.json())
			.then((title) => setTitle(title));
	}, []);

	return (
		<div className='container'>
			<Header
				title={title.header}
				onAdd={() => setShowAddTask(!showAddTask)}
				showAdd={showAddTask}
			/>
			{showAddTask && <AddTask onAdd={addTask} />}
			{tasks.length > 0 ? (
				<Tasks
					tasks={tasks}
					onDelete={deleteTask}
					onToggle={toggleReminder}
				/>
			) : (
				'No Tasks'
			)}
		</div>
	);
}

export default App;
