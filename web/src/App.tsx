import { Component, createResource, lazy, Show } from 'solid-js'
import { Routes, Route } from '@solidjs/router'
import { themeChange } from 'theme-change'
import { dedupExchange, fetchExchange, createClient } from '@urql/core'
import { offlineExchange } from '@urql/exchange-graphcache'
import { makeDefaultStorage } from '@urql/exchange-graphcache/default-storage'

import { NavBar } from './components/NavBar'
import { whoAmIQuery } from './utils/graphql'
import { setAppState } from './utils/store'
import schema from './generated/schema'

const About = lazy(() => import('./pages/About'))
const Home = lazy(() => import('./pages/Home'))
const Members = lazy(() => import('./pages/Members'))
const Profile = lazy(() => import('./pages/Profile'))
const SignIn = lazy(() => import('./pages/SignIn'))
const SignUp = lazy(() => import('./pages/SignUp'))

const storage = makeDefaultStorage({
	idbName: 'dsc_cache',
	maxAge: 1
})

const cache = offlineExchange({
	schema,
	storage,
	keys: {
		AuthResult: () => null
	}
})

export const client = createClient({
	url: 'http://localhost:4000/graphql',
	requestPolicy: 'cache-and-network',
	exchanges: [
		dedupExchange,
		cache,
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
	
	const [user] = createResource(async () => {
		const { data } = await client.query(whoAmIQuery, {}).toPromise()

		if(data.whoAmI && data.whoAmI.user) {
			setAppState({ user: data.whoAmI.user })
		} else {
			setAppState({ user: {
				id: '',
				displayName: '',
				fullName: '',
				email: '',
				role: '',
				createdAt: '',
				updatedAt: '',
			}})
		}

		return data.whoAmI.user
	})

	client.subscribeToDebugTarget(event => {
		if (event.source === 'dedupExchange') return
		console.log(event); // { type, message, operation, data, source, timestamp }
	})
	
  	return (
		<>
			<NavBar />
			<Show when={!user.loading}>
				<Routes>
					<Route path="/" element={Home} />
					<Route path="/about" element={About} />
					<Route path="/members" element={Members} />
					<Route path="/profile" element={Profile} />
					<Route path="/signin" element={SignIn} />
					<Route path="/signup" element={SignUp} />
				</Routes>
			</Show>
		</>
  	)
}

export default App
