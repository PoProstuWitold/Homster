import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react'
import { AiFillEyeInvisible, AiFillEye } from 'react-icons/ai'
import { FiArrowLeft } from 'react-icons/fi'
import { useForm } from 'react-hook-form'
import { useLoginMutation, useRegisterMutation } from '@/generated/graphql'
import { withUrqlClient } from 'next-urql'
import { urqlClient } from '@/lib/urql'

function Login() {
	const [, login] = useLoginMutation()
	const [, register] = useRegisterMutation()

    const [FormType, setFormType] = useState<'login' | 'register'>('login')
    const [open, setOpen] = useState<boolean>(false)
	const [ApiErrors, setApiErrors] = useState<any>([])
    const toggle = () =>{
        setOpen(!open)
    }

    const changeForm = (formType: 'login' | 'register') => {
        setFormType(formType)
		clearLoginErrors()
		clearRegisterErrors()
		setApiErrors([])
    }

	const { 
		register: loginReg, handleSubmit: handleLoginSubmit, 
		formState: { 
			errors: loginErrors, 
			isSubmitting: isLoginSubmitting, 
		},
		clearErrors: clearLoginErrors 
	} = useForm()
	const {
		register: registerReg, handleSubmit: handleRegisterSubmit, 
		formState: { 
			errors: registerErrors, 
			isSubmitting: isRegisterSubmitting 
		},
		clearErrors: clearRegisterErrors 
	} = useForm()

	const options = {
		email: { required: 'Email is required' },
		password: {
			required: 'Password is required',
			minLength: {
				value: 8,
				message: 'Password must be at least 8 characters long'
			}
		},
		fullName: { required: 'Full name is required' },
		displayName: { required: 'Display name is required' }
	}

	const handleLogin = async (data: any) => {
		try {
			console.log(data)
			const res = await login(data)
			console.log('res', res)
			//@ts-ignore
			if(res.data && res.data.error) setApiErrors(res.data.error.errors)
			setTimeout(() => {
				setApiErrors([])
			}, 5000)
		} catch (err) {
			console.error(err)
		}
	}
	const errorLogin = (errors: any) => {
		console.log(errors)
		setTimeout(() => {
			clearLoginErrors()
		}, 5000)
	}

	const handleRegister = async (data: any) => {
		try {
			console.log(data)
			const res = await register(data)
			console.log('res', res)
			//@ts-ignore
			if(res.data && res.data.error) setApiErrors(res.data.error.errors)
			setTimeout(() => {
				setApiErrors([])
			}, 5000)
		} catch (err) {
			console.error(err)
		}
	}
	const errorRegister = (errors: any) => {
		console.log(errors)
		setTimeout(() => {
			clearRegisterErrors()
		}, 5000)
	}

    return (
        <>
            <Head>
                <title>Login</title>
                <meta name="description" content="Login or create account" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className="flex w-full m-auto mt-0 shadow-xl xl:w-4/12 md:w-10/12 md:mt-10 bg-base-200 rounded-xl" >
                    <div className="mx-auto w-96">
                    <p className="m-10 mx-auto text-lg font-bold text-center">Homster</p>
                    <div className="grid grid-cols-2 my-5">
                        <button onClick={() => changeForm('login')} className={`col-span-1 p-5 text-center text-lg  font-semibold ${FormType === 'login' ? 'border-b-primary border-b-2 text-primary' : ''}`}>Sign in</button>
                        <button onClick={() => changeForm('register')} className={`col-span-1 p-5 text-center text-lg  font-semibold ${FormType === 'register' ? 'border-b-primary border-b-2 text-primary' : ''}`}>Sign up</button>
                    </div>
                    {FormType && FormType === 'login' ?
                        <div>
                                <form onSubmit={handleLoginSubmit(handleLogin, errorLogin)}>
                                    <div>
                                        <div className="form-control">
                                            <label className="label">
                                                <span className="font-semibold label-text">Email</span>
                                                <span className="font-medium label-text-alt">e.g. john@gmail.com</span>
                                            </label>
                                            <input {...loginReg('email', options.email)} placeholder="Enter your email" type="email" name="email" className={`w-full p-3 transition duration-200 rounded input`}/>
                                            <label className="label">
                                                {loginErrors && loginErrors.email && <span className="text-error">{loginErrors.email.message?.toString()}</span>}
												{ApiErrors && ApiErrors.email && <span className="text-error">{ApiErrors.email}</span>}
                                            </label>    
                                        </div>
                                    </div>
                                    <div>
                                        <div className="form-control">
                                            <label className="relative label">
                                                <span className="font-semibold label-text">Password</span>
                                                <span className="font-medium label-text-alt">e.g. K3ybo@rdC@t</span>
                                                <div className='absolute text-2xl top-12 right-5'>
                                                    {
                                                        (open === false) ? <AiFillEye onClick={toggle}/> :
                                                        <AiFillEyeInvisible onClick={toggle}/>
                                                    }
                                                </div>
                                            </label>
                                            <input {...loginReg('password', options.password)} placeholder="Enter your password" type={(open === false)? 'password' :'text'} name="password" className={`w-full p-3 transition duration-200 rounded input`}/>
                                            
                                            <label className="label">
												{loginErrors && loginErrors.password && <span className="text-error">{loginErrors.password.message?.toString()}</span>}
												{ApiErrors && ApiErrors.password && <span className="text-error">{ApiErrors.password}</span>}
                                            </label>
                                        </div>
                                    </div>
                                    <div className="flex justify-between mb-5">
                                        <Link href="/account/password/reset">
                                            <div className="form-control">
                                                <label className="cursor-pointer hover:underline">
                                                    <p>Forgot password?</p>
                                                </label>
                                            </div>
                                        </Link>
                                    </div>
                                    <button type="submit" disabled={isLoginSubmitting} className={`w-full btn ${isLoginSubmitting ? 'btn loading' : ''}`}>
                                        Submit
                                    </button>
                                </form>
                        </div> : null
                        }
                        {FormType && FormType === 'register' ?
                        <div>
                                <form onSubmit={handleRegisterSubmit(handleRegister, errorRegister)}>
                                    <div>
                                        <div className="form-control">
                                            <label className="label">
                                                <span className="font-semibold label-text">Email</span>
                                                <span className="font-medium label-text-alt">e.g. john@gmail.com</span>
                                            </label>
                                            <input {...registerReg('email', options.email)} placeholder="Enter your email" type="email" name="email" className={`w-full p-3 transition duration-200 rounded input`}/>
                                            <label className="label">
												{registerErrors && registerErrors.email && <span className="text-error">{registerErrors.email.message?.toString()}</span>}
												{ApiErrors && ApiErrors.email && <span className="text-error">{ApiErrors.email}</span>}
                                            </label>                                           
                                        </div>
                                    </div>
                                    <div>
                                        <div className="form-control">
                                            <label className="relative label">
                                                <span className="font-semibold label-text">Password</span>
                                                <span className="font-medium label-text-alt">e.g. K3ybo@rdC@t</span>
                                                <div className='absolute text-2xl top-12 right-5'>
                                                    {
                                                        (open === false) ? <AiFillEye onClick={toggle}/> :
                                                        <AiFillEyeInvisible onClick={toggle}/>
                                                    }
                                                </div>
                                            </label>
                                            <input {...registerReg('password', options.password)} placeholder="Enter your password" type={(open === false)? 'password' :'text'} name="password" className={`w-full p-3 transition duration-200 rounded input`}/>                                           
                                            <label className="label">
												{registerErrors && registerErrors.password && <span className="text-error">{registerErrors.password.message?.toString()}</span>}
												{ApiErrors && ApiErrors.password && <span className="text-error">{ApiErrors.password}</span>}
                                            </label>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="form-control">
                                            <label className="label">
                                                <span className="font-semibold label-text">Full name</span>
                                                <span className="font-medium label-text-alt">e.g. John Doe</span>
                                            </label>
                                            <input {...registerReg('fullName', options.fullName)} placeholder="Enter your full name" type="text" name="fullName" className={`w-full p-3 transition duration-200 rounded input`}/>
                                            <label className="label">
												{registerErrors && registerErrors.fullName && <span className="text-error">{registerErrors.fullName.message?.toString()}</span>}
												{ApiErrors && ApiErrors.fullName && <span className="text-error">{ApiErrors.fullName}</span>}
                                            </label>                                            
                                        </div>
                                    </div>
                                    <div>
                                        <div className="form-control">
                                            <label className="label">
                                                <span className="font-semibold label-text">Display name</span>
                                                <span className="font-medium label-text-alt">e.g. JohnKov1337</span>
                                            </label>
                                            <input {...registerReg('displayName', options.displayName)} placeholder="Enter your display name" type="text" name="displayName" className={`w-full p-3 transition duration-200 rounded input`}/>
                                            <label className="label">
												{registerErrors && registerErrors.displayName && <span className="text-error">{registerErrors.displayName.message?.toString()}</span>}
												{ApiErrors && ApiErrors.displayName && <span className="text-error">{ApiErrors.displayName}</span>}
                                            </label>                                            
                                        </div>
                                    </div>                                    
                                    <button type="submit" disabled={isRegisterSubmitting} className={`w-full btn ${isRegisterSubmitting ? 'btn loading' : ''}`}>
                                        Submit
                                    </button>
                                </form>
                        </div> : null
                        }
                        <div className="my-10"></div>
                    </div>
            </div>    
            <div className="flex w-full m-auto mt-8 lg:w-4/12 md:w-10/12">
                <Link href="/" className="m-auto mb-10 text-xl shadow-xl btn btn-ghost btn-sm rounded-btn lg:m-0 btn-primary btn-outline">
                    <>
                        <FiArrowLeft/> Back to main site
                    </>
                </Link>
            </div>
        </>
    )
}

export default withUrqlClient(urqlClient, { ssr: true })(Login)