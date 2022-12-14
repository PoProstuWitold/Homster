import { Component } from 'solid-js'
import { NavBar } from './components/NavBar'

const App: Component = () => {
  	return (
		<>
			<NavBar />
			<>
			<main>
				<div>
					<h2 class="mb-4 text-2xlfont-bold">Main content</h2>
				</div>
			</main>
			</>
		</>
  	)
}

export default App
