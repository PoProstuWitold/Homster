import type { AppProps } from 'next/app'
import { isServer } from '@/utils'

export default function App({ Component, pageProps }: AppProps) {
  	return (
		isServer && 
		<>
			<Component {...pageProps} />
		</>
	)
}
