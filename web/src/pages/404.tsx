import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'

export default function NotFound() {
	const router = useRouter()
	
	return (
		<>
			<Head>
				<title>{`Not found: ${router.asPath}`}</title>
			</Head>
			<main className="px-5">
                <div className="flex flex-col justify-center items-center min-h-screen">
                <span className="text-5xl font-bold text-error text-center">
					<h1 className="text-6xl">404</h1>
					<h2>Page Not Found</h2>
				</span>
                <p className="mt-4 text-center">
                    The page you are looking for does not exist or has been removed.
                </p>
                <Link href="/" className="mt-4 link font-bold">
                    ← Back to Home Page
                </Link>
                </div>
			</main>
		</>
	)
}