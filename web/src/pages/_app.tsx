import '../styles/global.css'

import { useRouter } from 'next/router'
import type { AppProps } from 'next/app'
import { ThemeProvider } from 'next-themes'
import { Toaster } from 'react-hot-toast'
import dayjs from 'dayjs'

import { NavBar } from '@/components/NavBar'
import UrqlProvider from '@/lib/urql/UrqlProvider'

dayjs().format()

export default function App({ Component, pageProps }: AppProps) {
	const router = useRouter()

  	return (
		<>
			<UrqlProvider pageProps={pageProps}>
				<ThemeProvider
					defaultTheme="system"
				>
					{router.pathname !== '/login' ? <NavBar /> : null}
					<Component {...pageProps} />
					<Toaster/>
				</ThemeProvider>
			</UrqlProvider>
		</>
	)
}
