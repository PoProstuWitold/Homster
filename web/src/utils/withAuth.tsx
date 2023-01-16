import { Match, Switch } from 'solid-js'
import { appState } from './store'

export enum AuthOption {
    REQUIRED = 'required',
    FORBIDDEN = 'forbidden',
    ANY = 'any'
}

export const withAuth = (option: AuthOption, Component) => {
    const AuthenticatedComponent = () => {
        return (
            <>
            <Switch fallback={<p>Checking if user is authenticated...</p>}>
                <Match when={(appState.user && option === AuthOption.REQUIRED) || (appState.user && option === AuthOption.ANY)}>
                    <Component/>
                </Match>
                <Match when={(!appState.user && option === AuthOption.FORBIDDEN) || (!appState.user && option === AuthOption.ANY)}>
                    <Component />
                </Match>
                <Match when={!appState.user && option === AuthOption.REQUIRED}>
                    <div>You must be logged in</div>
                </Match>
                <Match when={appState.user && option === AuthOption.FORBIDDEN}>
                    <div>You can't be logged in</div>
                </Match>
            </Switch>
            </>
        )
    }

    return AuthenticatedComponent
}