import { LoginForm } from '../components/LoginForm'
import { withAuth, AuthOption } from '../utils/withAuth'

const SignIn = () => {
    return (
		<>
			<main>
				<LoginForm formType={`signin`}/>
			</main>
		</>
    )
}

export default withAuth(AuthOption.FORBIDDEN, SignIn)