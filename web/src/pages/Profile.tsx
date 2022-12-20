import { createResource, Show } from 'solid-js'

import { client } from '../App'
import { whoAmIQuery } from '../utils/graphql'
import { withAuth, AuthOption } from '../utils/withAuth'

const Profile = () => {

	const [profile] = createResource(async () => {
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

export default withAuth(AuthOption.REQUIRED, Profile)