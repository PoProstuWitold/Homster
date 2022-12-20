import { createStore } from 'solid-js/store'

export const [appState, setAppState] = createStore({
    user: {
        id: '',
        displayName: '',
        fullName: '',
        email: '',
        role: '',
        createdAt: '',
        updatedAt: '',
    }
})