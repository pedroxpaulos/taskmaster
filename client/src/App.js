import Navbar from './components/Navbar';
import ShowList from './components/ShowList';
import NewTask from './components/NewTask';

function App() {
	return (
		<div className="App">
			<Navbar />
			<NewTask />
			<ShowList />
		</div>
	);
}

export default App;
