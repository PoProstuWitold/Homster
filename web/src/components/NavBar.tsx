import { Component, createResource, Match, Switch } from "solid-js"
import { A } from '@solidjs/router'

import { client } from '../App'
import { themes } from '../utils/constans'
import { logoutMutation, whoAmIQuery } from '../utils/graphql'
import { appState, setAppState } from '../utils/store'
import { SelectTheme } from './SelectTheme'

const NavBar: Component = () => {

	const logout = async () => {
		try {
			const result = await client
            .mutation(logoutMutation, {})
			.toPromise()

			setAppState({ user: null })

			console.log('logout result', result)
			console.log('user', appState.user)
		} catch (err) {
			console.error(err)
			setAppState({ user: null})
		}
	}

	return (
		<nav 
			class={`z-50 navbar transition ease-in-out delay-[50ms] shadow-2xl bg-base-300 sticky top-0`}
		>
			<div class="navbar-start">
				<div class="dropdown">
					<label tabIndex={0} class="btn btn-ghost lg:hidden">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="w-5 h-5"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M4 6h16M4 12h8m-8 6h16"
							/>
						</svg>
					</label>
					<ul
						tabIndex={0}
						class="p-2 mt-3 font-semibold shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-32"
					>
						<li class="my-1">
							<A href="/about" class="btn btn-ghost btn-sm normal-case">About</A>
						</li>
						<li class="my-1">
							<A href="/members" class="btn btn-ghost btn-sm normal-case">Members</A>
						</li>
						<Switch fallback={null}>
						<Match when={appState && appState.user && appState.user.id}>
							<li class="my-1">
								<A href="/profile" class="btn btn-ghost btn-sm normal-case">Profile</A>
							</li>
							<li class="my-1">
								<button onClick={() => logout()} class="btn btn-ghost btn-sm normal-case">Log out</button>
							</li>
						</Match>
						<Match when={!appState || !appState.user}>
							<li class="my-1">
								<A href="/signin" class="btn btn-ghost btn-sm normal-case">Sign in</A>
							</li>
							<li class="my-1">
								<A href="/signup" class="btn btn-ghost btn-sm normal-case">Sign up</A>
							</li>
						</Match>
						</Switch>
					</ul>
				</div>
				<A href="/" class="text-xl normal-case btn btn-ghost">
					Data Science Club
				</A>
				<div class="hidden lg:flex">
                    <ul class="menu menu-horizontal px-1 font-medium">
                        <li class="mx-2">
                            <A href="/about">About</A>
                        </li>
                        <li class="mx-2">
                            <A href="/members">Members</A>
                        </li>
                    </ul>
                </div>
			</div>
			<div class="hidden navbar-center lg:flex">
				
			</div>
			<div class="navbar-end">

				<SelectTheme themes={themes} />
                <div class="hidden lg:flex">
				<Switch fallback={null}>
					<Match when={appState.user}>
						<A href="/profile" class="btn btn-base btn-outline mx-2 normal-case">Profile</A>
                    	<button onClick={() => logout()} class="btn btn-primary mx-2 normal-case">Log out</button>
					</Match>
					<Match when={!appState.user}>
						<A href="/signin" class="btn btn-base btn-outline mx-2 normal-case">Sign in</A>
                    	<A href="/signup" class="btn btn-primary mx-2 normal-case">Sign up</A>
					</Match>
				</Switch>
                </div>
			</div>
		</nav>
	)
}

export { NavBar } 