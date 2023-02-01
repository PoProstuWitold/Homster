import Head from 'next/head'
import { useRouter } from 'next/router'

export default function NotFound() {
	const router = useRouter()
	
	return (
		<>
			<Head>
				<title>{`Not found: ${router.asPath}`}</title>
			</Head>
			<div>
                404 - Page not found
            </div>
		</>
	)
}