import { Component, For } from 'solid-js'

interface Theme {
    name: string
}

interface SelectProps {
    themes: Theme[]
}

const SelectTheme: Component<SelectProps> = ({ themes }) => {
    return (
      <>
            <select data-choose-theme
                class="max-w-xs select select-ghost font-semibold mx-2"
            >
                <For each={themes}>{(theme, _i) => 
                    <option value={theme.name.toLowerCase()}>
                        {theme.name}
                    </option>
                    }
                </For>
            </select>
      </>
    )
}

export { SelectTheme }