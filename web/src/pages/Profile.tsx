import { createResource, Show } from 'solid-js'

import { client } from '../App'
import { whoAmIQuery } from '../utils/graphql'

const Profile = () => {

	const [profile, { refetch }] = createResource(async () => {
		const { data } = await client.query(whoAmIQuery, {}).toPromise()
		
		return data.whoAmI.user
	})

    return (
		<>
			<main>
                <Show when={!profile.loading}>
					profile
					<br />
					{profile().email}
				</Show>
			</main>
		</>
    )
}

export default Profile