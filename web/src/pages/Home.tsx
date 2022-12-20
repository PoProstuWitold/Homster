import { createResource, Show } from 'solid-js'

import { client } from '../App'
import { getAllUsersQuery } from '../utils/graphql'
import { withAuth, AuthOption } from '../utils/withAuth'

const Home = () => {

	const [users, { refetch }] = createResource(async () => {
		const { data } = await client.query(getAllUsersQuery, {}).toPromise()
		console.log(data.getUsers)
		return data.getUsers
	})

    return (
		<>
			<main>
				<Show when={!users.loading}>
					users
					<br />
					{users()[0].email}
				</Show>
			</main>
		</>
    )
}

export default withAuth(AuthOption.ANY, Home)