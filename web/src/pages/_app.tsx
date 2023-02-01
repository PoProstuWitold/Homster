import '../styles/global.css'

import type { AppProps } from 'next/app'
import { ThemeProvider } from 'next-themes'

import { NavBar } from '@/components/NavBar'

export default function App({ Component, pageProps }: AppProps) {
  	return (
		<>
			<ThemeProvider>
				<NavBar />
				<Component {...pageProps} />
			</ThemeProvider>
		</>
	)
}
