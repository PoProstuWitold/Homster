import { withAuth, AuthOption } from '../utils/withAuth'

const Members = () => {
    return (
		<>
			<main>
                Members
			</main>
		</>
    )
}

export default withAuth(AuthOption.ANY, Members)