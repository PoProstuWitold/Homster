import { Component } from "solid-js"
import { themes } from "../utils/constans"
import { SelectTheme } from "./SelectTheme"

const NavBar: Component = () => {

	return (
		<nav 
			class={`fixed z-50 navbar transition ease-in-out delay-[50ms] shadow-2xl bg-base-300`}
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
						class="p-2 mt-3 font-semibold shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52"
					>
						<li>
							<a href="/">About</a>
						</li>
						<li>
							<a href="/">Members</a>
						</li>
						<li>
							<a href="/">Profile</a>
						</li>
					</ul>
				</div>
				<a href="/#main" class="text-xl normal-case btn btn-ghost">
					Data Science Club
				</a>
			</div>
			<div class="hidden navbar-center lg:flex">
				
			</div>
			<div class="navbar-end">
                <div class="hidden lg:flex">
                    <ul class="menu menu-horizontal px-1 font-medium">
                        <li class="mx-2">
                            <a href="/">About</a>
                        </li>
                        <li class="mx-2">
                            <a href="/">Members</a>
                        </li>
                        <li class="mx-2">
                            <a href="/">Profile</a>
                        </li>
                    </ul>
                    <a class="btn btn-base mx-2 normal-case">Sign up</a>
                    <a class="btn btn-base btn-outline mx-2 normal-case">Sign in</a>
                </div>
                <SelectTheme themes={themes} />
			</div>
		</nav>
	)
}

export { NavBar } 