import { createResource, Show } from 'solid-js'

import { client } from '../App'
import { whoAmIQuery } from '../utils/graphql'
import { appState } from '../utils/store'
import { withAuth, AuthOption } from '../utils/withAuth'

const Profile = () => {
	
    return (
		<>
			<main>
                <Show when={appState.user.id}>
					profile
					<br />
					{appState.user.email}
				</Show>
			</main>
		</>
    )
}

export default withAuth(AuthOption.REQUIRED, Profile)