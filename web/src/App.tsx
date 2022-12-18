import { Component, lazy } from 'solid-js'
import { Routes, Route } from '@solidjs/router'
import { themeChange } from 'theme-change'
import { dedupExchange, fetchExchange, createClient } from '@urql/core'

import { NavBar } from './components/NavBar'

const About = lazy(() => import('./pages/About'))
const Home = lazy(() => import('./pages/Home'))
const Members = lazy(() => import('./pages/Members'))
const Profile = lazy(() => import('./pages/Profile'))
const SignIn = lazy(() => import('./pages/SignIn'))
const SignUp = lazy(() => import('./pages/SignUp'))

export const client = createClient({
	url: 'http://localhost:4000/graphql',
	requestPolicy: 'cache-and-network',
	exchanges: [
		dedupExchange,
		fetchExchange,
	],
	fetchOptions: () => {
		return {
			credentials: 'include'
		}
	}
})

const App: Component = () => {
	
	themeChange()
	
  	return (
		<>
			<NavBar />
			<Routes>
				<Route path="/" element={Home} />
				<Route path="/about" element={About} />
				<Route path="/members" element={Members} />
				<Route path="/profile" element={Profile} />
				<Route path="/signin" element={SignIn} />
				<Route path="/signup" element={SignUp} />
			</Routes>
		</>
  	)
}

export default App
