import '../styles/global.css'

import { useRouter } from 'next/router'
import type { AppProps } from 'next/app'
import { ThemeProvider } from 'next-themes'
import { NavBar } from '@/components/NavBar'

export default function App({ Component, pageProps }: AppProps) {
	const router = useRouter()

  	return (
		<>
			<ThemeProvider
				defaultTheme="system"
			>
				{router.pathname !== '/login' ? <NavBar /> : null}
				<Component {...pageProps} />
			</ThemeProvider>
		</>
	)
}
