import { LoginForm } from '../components/LoginForm'
import { withAuth, AuthOption } from '../utils/withAuth'

const SignUp = () => {
    return (
		<>
			<main>
				<LoginForm formType={`signup`}/>
			</main>
		</>
    )
}

export default withAuth(AuthOption.FORBIDDEN, SignUp)