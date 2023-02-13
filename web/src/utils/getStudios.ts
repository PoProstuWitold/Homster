export const getStudios = (studios: any[]) => {
    const developers: any[] = []
    const publishers: any[] = []

    studios.map(studio => {
        switch (studio.contribution) {
            case 'Developer':
                developers.push(studio.studio)
                break
            case 'Publisher':
                publishers.push(studio.studio)
                break
            case 'DeveloperAndPublisher':
                developers.push(studio.studio)
                publishers.push(studio.studio)
                break
            default:
                break
        }
    })

    return [developers, publishers]
}