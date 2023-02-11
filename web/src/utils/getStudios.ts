export const getStudios = (studios: any[]) => {
    const developers: any[] = []
    const publishers: any[] = []

    studios.map(studio => {
        switch (studio.contribution) {
            case 'Developer':
                developers.push(studio.studio.name)
                break
            case 'Publisher':
                publishers.push(studio.studio.name)
                break
            case 'DeveloperAndPublisher':
                developers.push(studio.studio.name)
                publishers.push(studio.studio.name)
                break
            default:
                break
        }
    })

    return [developers, publishers]
}