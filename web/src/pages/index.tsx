import { 
	useGetAllUsersQuery, useGetUserQuery, useMeQuery,
	useLoginMutation, useLogoutMutation, useRegisterMutation,
} from '@/generated/graphql'
import { urqlClient } from '@/lib/urql'
import { withUrqlClient } from 'next-urql'

function Home() {
	const [{ data, fetching, error }] = useGetAllUsersQuery()
	
	if(fetching) return <div>Fetching</div>
	if(error) return <div>Error</div>
	if(!data) return <div>No data</div>

	return (
		<>
			<main>
				<div>
					{data.users.map((user, index) => {
						return (
							<p key={index}>name: {user.fullName}</p>
						)
					})}
				</div>
			</main>
		</>
	)
}

export default withUrqlClient(urqlClient, { ssr: true })(Home)