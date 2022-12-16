import { createForm, Form, Field, zodForm } from '@modular-forms/solid'
import { Component } from 'solid-js'
import { z } from 'zod'
import { client } from '../App'
import { loginMutation, registerMutation } from '../utils/graphql'

import { TextInput } from './TextInput'

const LoginForm: Component<any> = ({ formType = 'signin' }) => {
    const signInSchema = z.object({
        email: z
            .string()
            .min(1, 'Please enter your email.')
            .email('The email address is badly formatted.'),
        password: z
            .string()
            .min(1, 'Please enter your password.')
            .min(8, 'You password must have 8 characters or more.'),
    })
    
    type SignInValues = {
        email: string
        password: string
    }
    
    const signInUser = (values: SignInValues) => {
        // client
        //     .mutation(
        //         loginMutation,
        //         {
        //             email: values.email,
        //             password: values.password,
        //         }
        //     )
        //     .toPromise()
        //     .then(result => {
        //         console.log(result.data)
        //     })

        console.log(values)
    }

    const signIn = createForm<z.infer<typeof signInSchema>>({
        validate: zodForm(signInSchema),
        initialValues: {
            email: '',
            password: ''
        }
    })

    const signUpSchema = z.object({
        email: z
            .string()
            .min(1, 'Please enter your email.')
            .email('The email address is badly formatted.'),
        password: z
            .string()
            .min(1, 'Please enter your password.')
            .min(8, 'You password must have 8 characters or more.'),
        fullName: z
            .string()
            .min(6, 'Please enter your full name.'),
        displayName: z
            .string()
            .min(6, 'Please enter your display name.')
    })
    
    type SignUpValues = {
        email: string
        password: string
        fullName: string
        displayName: string
    }
    
    const signUpUser = (values: SignUpValues) => {
        // client
        //     .mutation(
        //         registerMutation,
        //         {
        //             fullName: values.fullName,
        //             displayName: values.displayName,
        //             email: values.email,
        //             password: values.password,
        //         }
        //     )
        //     .toPromise()
        //     .then(result => {
        //         console.log(result.data)
        //     })

        console.log(values)
    }

    const signUp = createForm<z.infer<typeof signUpSchema>>({
        validate: zodForm(signUpSchema),
        initialValues: {
            email: '',
            password: '',
            fullName: '',
            displayName: ''
        }
    })

    return (
        <>
            <div class="flex flex-col w-full m-auto mt-0 lg:w-4/12 md:w-10/12 md:mt-14 lg:bg-base-200 lg:rounded-xl lg:shadow-xl">
                {formType && formType === 'signin' && (
                    <>
                        <h1 class="text-center my-5 font-bold">Sign in</h1>
                        <Form of={signIn} onSubmit={signInUser} class="mx-auto">
                            <Field of={signIn} name="email">
                                {(field) => (
                                    <TextInput
                                        {...field.props}
                                        type="email"
                                        label="Email"
                                        value={field.value}
                                        error={field.error}
                                        required
                                    />
                                )}
                            </Field>
                            <Field of={signIn} name="password">
                                {(field) => (
                                    <TextInput
                                        {...field.props}
                                        type="password"
                                        label="Password"
                                        value={field.value}
                                        error={field.error}
                                        required
                                    />
                                )}
                            </Field>
                            <input class="w-full btn my-5" type="submit" />
                        </Form>
                    </>
                )

                }
                {formType && formType === 'signup' && (
                    <>
                        <h1 class="text-center my-5 font-bold">Sign up</h1>
                        <Form of={signUp} onSubmit={signUpUser} class="mx-auto">
                            <Field of={signUp} name="email">
                                {(field) => (
                                    <TextInput
                                        {...field.props}
                                        type="email"
                                        label="Email"
                                        value={field.value}
                                        error={field.error}
                                        required
                                    />
                                )}
                            </Field>
                            <Field of={signUp} name="password">
                                {(field) => (
                                    <TextInput
                                        {...field.props}
                                        type="password"
                                        label="Password"
                                        value={field.value}
                                        error={field.error}
                                        required
                                    />
                                )}
                            </Field>
                            <Field of={signUp} name="fullName">
                                {(field) => (
                                    <TextInput
                                        {...field.props}
                                        type="text"
                                        label="Full name"
                                        value={field.value}
                                        error={field.error}
                                        required
                                    />
                                )}
                            </Field>
                            <Field of={signUp} name="displayName">
                                {(field) => (
                                    <TextInput
                                        {...field.props}
                                        type="text"
                                        label="Display name"
                                        value={field.value}
                                        error={field.error}
                                        required
                                    />
                                )}
                            </Field>
                            <input class="w-full btn my-5" type="submit" />
                        </Form>
                    </>
                )

                }
            </div>
            
        </>
    )
}

export { LoginForm }