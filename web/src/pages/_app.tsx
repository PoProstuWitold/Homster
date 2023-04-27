import '../styles/global.css'

import { useRouter } from 'next/router'
import type { AppProps } from 'next/app'
import { ThemeProvider } from 'next-themes'
import { Toaster } from 'react-hot-toast'
import dayjs from 'dayjs'
import NextNProgress from 'nextjs-progressbar'
import { DefaultSeo } from 'next-seo'

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
					<DefaultSeo
						title={`Homster`}
						description={`Library of games you desire`}
						canonical={`https://witoldzawada.dev/`}
						openGraph={{
							url: 'https://www.homster.com/',
							title: 'Homster',
							description: 'Library of games you desire',
							siteName: 'Homster - Game Library'
						}}
						additionalLinkTags={[
							{
								rel: 'manifest',
								href: '/site.webmanifest'
							},
							{
								rel: 'icon',
								href: '/favicon.ico'
							},
							{
								rel: 'apple-touch-icon',
								href: '/apple-touch-icon.png',
								sizes: '76x76'
							},
						]}
					/>
					<main className="ease-in-out transition-all">
						<NextNProgress />
						{router.pathname !== '/login' ? <NavBar /> : null}
						<Component {...pageProps} />
						<Toaster/>
					</main>
				</ThemeProvider>
			</UrqlProvider>
		</>
	)
}
