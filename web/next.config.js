/** @type {import('next').NextConfig} */
const nextConfig = {
  	reactStrictMode: true,
	  i18n: {
        locales: ["en"],
        defaultLocale: "en",
    },
	images: {
		dangerouslyAllowSVG: true,
		remotePatterns: [
			{
				protocol: 'http',
				hostname: 'localhost',
				port: '4000',
				pathname: '/public/**',
			},
			{
				protocol: 'https',
				hostname: 'random.imagecdn.app'
			},
			{
				protocol: 'https',
				hostname: 'api.dicebear.com'
			}
		],
	},
	productionBrowserSourceMaps: true
}

module.exports = nextConfig
