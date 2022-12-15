import { JSX, splitProps } from 'solid-js'

type TextInputProps = {
    ref: (element: HTMLInputElement) => void
    type: 'text' | 'email' | 'tel' | 'password' | 'url' | 'number' | 'date'
    name: string
    value: string | number | undefined
    onInput: JSX.EventHandler<HTMLInputElement, InputEvent>
    onChange: JSX.EventHandler<HTMLInputElement, Event>
    onBlur: JSX.EventHandler<HTMLInputElement, FocusEvent>
    placeholder?: string
    required?: boolean
    label?: string
    error?: string
}

const TextInput = (props: TextInputProps) => {
    const [, inputProps] = splitProps(props, ['value', 'label', 'error'])

    return (
        <div class="flex flex-col w-64 mx-auto mt-2">
            {props.label && (
                <label for={props.name} class="font-semibold italic">
                {props.label} {props.required && <span>*</span>}
                </label>
            )}
            <input
                class="w-full p-3 transition duration-200 rounded input mb-4"
                {...inputProps}
                id={props.name}
                value={props.value || ''}
                aria-invalid={!!props.error}
                aria-errormessage={`${props.name}-error`}
                placeholder={props.placeholder}
            />
            {props.error && <div id={`${props.name}-error`} class="font-semibold text-error">{props.error}</div>}
        </div>
    )
}

export { TextInput }