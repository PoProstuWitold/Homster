/** @type {import('next').NextConfig} */
const nextConfig = {
  	reactStrictMode: true,
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
	}
}

module.exports = nextConfig
