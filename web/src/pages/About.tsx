import { withAuth, AuthOption } from '../utils/withAuth'

const About = () => {
    return (
		<>
			<main>
				About
			</main>
		</>
    )
}

export default withAuth(AuthOption.ANY, About)