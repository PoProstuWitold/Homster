import { withUrqlClient } from 'next-urql'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import dayjs from 'dayjs'
import { GiInfo } from 'react-icons/gi'
import { GiPartyPopper, GiCakeSlice } from 'react-icons/gi'
import { MdOutlineDescription } from 'react-icons/md'
import { AiOutlineEdit } from 'react-icons/ai'
import { toast } from 'react-hot-toast'
import { useForm } from 'react-hook-form'

import { urqlClientSsr } from '@/lib/urql/initUrqlClient'
import { useGetUserByFieldQuery, useMeQuery, useUpdateUserMutation } from '@/generated/graphql'

function Profile() {
    const { query } = useRouter()

    const [{
        data
    }, reexecute] = useGetUserByFieldQuery({
        variables: {
            field: 'displayName',
            value: (query['displayName'] as string)
        }
    })

    const [{
        data: authData
    }] = useMeQuery()

    const [, updateUser] = useUpdateUserMutation()

    const handleProfileUpdate = async (data: any) => {
        try {
            console.log(data.avatar)
            const res = await updateUser({
                values: {
                    bio: data.bio,
                    displayName: data.displayName,
                    fullName: data.fullName
                },
                ...(data.avatar.length && {
                    avatar: data.avatar[0]
                }),
                ...(data.cover.length && {
                    cover: data.cover[0]
                }),
            })
			if(!res.data || res.error) {
                if(res.error && res.error.graphQLErrors[0] && res.error.graphQLErrors[0].originalError) {
                    //@ts-ignore
                    const errors = res.error?.graphQLErrors[0].originalError.errors
                    console.log(errors)
                    toast.error(errors.avatar || errors.displayName || errors.fullName || errors.bio || 'Failed to update profile', {
                        duration: 3000
                    })
                }
            }
            if(res && res.data && res.data.updateUser) {
                reexecute()
                toast.success('Profile updated', {
                    duration: 3000
                })
            }
        } catch (err) {
            console.log(err)
        }
    }

    const options = {
		fullName: { 
            required: 'Full name is required' 
        },
		displayName: { 
            required: 'Display name is required' 
        },
        bio: {
            required: 'Biography is required'
        }
	}

    const { 
		register: updateReq, handleSubmit: handleLoginSubmit, 
		formState: { 
			errors: updateErrors, 
			isSubmitting, 
		},
		clearErrors: clearUpdateErrors
	} = useForm()

    const errorUpdate = (errors: any) => {
		console.log(errors)
		setTimeout(() => {
			clearUpdateErrors()
		}, 5000)
	}

    return (
        <>
            <Head>
				<title>{query['displayName']}</title>
			</Head>
            <main>
                {!data &&
                    <>
                        <p>User with display name of {query['displayName']} not found</p>
                    </>
                }
                <div className="flex flex-col min-h-screen">
                    {data && data.user &&
                        <>
                        {/* PROFILE PAGE HEADER */}
                        <div className='bg-base-200'>
                            <Image className='absolute w-full object-cover h-60' src={data.user.cover!} width={840} height={360} alt="gowno"/>
                            <div 
                                className="flex lg:flex-row flex-col gap-6 lg:px-10 mt-16 lg:items-end lg:justify-start lg:text-left justify-center items-center text-center my-4"
                            >
                                <div className="avatar z-40">
                                    <div className="w-64 rounded-2xl">
                                        <Image src={data.user.avatar!}  width={256} height={256} alt={"user avatar"}/>
                                    </div>
                                </div>
                                <div className="flex lg:flex-row flex-col gap-2 lg:gap-6 items-center w-full">
                                    <div className='z-40 min-w-fit'>
                                        <h1 className="text-4xl font-bold">{data.user.displayName}</h1>
                                        <h3 className="text-lg">{data.user.role}</h3>
                                    </div>
                                    <span className='divider lg:divider-horizontal m-0 p-0'></span>
                                    <div className='z-40 gap-4 btn-group flex-grow flex-auto md:mx-2 md:px-10 mx-5 px-5 lg:mx-0 lg:px-0 w-full'>
                                        <button className='btn btn-primary btn-outline flex-1'>Games</button>
                                        <button className='btn btn-primary btn-outline flex-1'>Friends</button>
                                        <button className='btn btn-primary btn-outline flex-1'>Stats</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* MAIN CONTENT */}
                        <div className="flex flex-col lg:flex-row gap-6 mt-8 md:px-10 p-4">
                            {/* Basic Profile Informations */}
                            <div className="flex flex-col lg:w-1/4 gap-6">
                                {/* Profile Informations */}
                                <div className="bg-base-300 rounded-lg shadow-md p-5 lg:h-72 flex flex-col gap-2">
                                    <h2 className="text-lg font-bold flex flex-row items-center gap-2">
                                        <GiInfo className="w-5 h-5"/>
                                        <p>Profile Informations</p>
                                    </h2>
                                    <div className="">
                                        <h3 className="text-md font-bold">Display name</h3>
                                        <p>{data.user.displayName}</p>
                                    </div>
                                    <div className="">
                                        <h3 className="text-md font-bold">Full Name</h3>
                                        <p>{data.user.fullName}</p>
                                    </div>
                                    <div className="">
                                        <h3 className="text-md font-bold">Email</h3>
                                        <p>{data.user.email}</p>
                                    </div>
                                    <div className="">
                                        <h3 className="text-md font-bold">Role</h3>
                                        <p>{data.user.role}</p>
                                    </div>
                                </div>
                                {/* Member since   */}
                                <div className="flex flex-col bg-base-300 rounded-lg shadow-md p-5 gap-6">
                                    <div className="flex flex-row gap-2 text-center items-center">
                                        <h2 className="text-lg font-bold flex flex-row items-center gap-2">
                                            <GiPartyPopper className="w-5 h-5"/>
                                            <p>Joined</p>
                                        </h2>
                                        <p className="italic">{dayjs(new Date(data.user.createdAt)).format('DD MMMM YYYY')}</p>
                                    </div>
                                    <div className="flex flex-row gap-2 text-center items-center">
                                        <h2 className="text-lg font-bold flex flex-row items-center gap-2">
                                            <GiCakeSlice className="w-5 h-5"/>
                                            <p>Last active</p>
                                        </h2>
                                        <p className="italic">{dayjs(new Date(data.user.updatedAt)).format('DD MMMM YYYY')}</p>
                                    </div>
                                </div>
                            </div>
                            {/* Recent games, About me, Edit */}
                            <div className="flex flex-col lg:w-3/4 gap-6">
                                {/* Edit */}
                                {authData && authData.me && authData.me.profile && data.user.id === authData.me.profile.id &&
                                        
                                <>
                                <div className="bg-base-300 rounded-lg shadow-md p-1">
                                    <div className="collapse collapse-arrow">
                                        <input type="checkbox" /> 
                                            <h2 className="text-lg font-bold collapse-title flex flex-row items-center gap-2">
                                            <AiOutlineEdit className="w-5 h-5"/>
                                            <p>Edit</p>
                                        </h2>
                                        <div className="collapse-content">
                                            <form className="flex flex-col gap-6" onSubmit={handleLoginSubmit(handleProfileUpdate, errorUpdate)}>
                                                <div className="form-control">
                                                    <label className="label font-bold font-lg">
                                                        <span className="label-text">Avatar</span>
                                                    </label>
                                                    <input 
                                                        {...updateReq('avatar', {
                                                            required: false,
                                                            onChange: ({
                                                                target: {
                                                                  validity,
                                                                  files: [file]
                                                                }
                                                            }: any) => {
                                                                console.log('validity.valid', validity.valid)
                                                                console.log('file', file)
                                                            }
                                                        })}
                                                        type="file" name="avatar" 
                                                        accept="image/*"
                                                        title='avatar'

                                                        className={`w-full file-input`}
                                                    />  
                                                    {updateErrors && updateErrors.avatar && <span className="text-error">{updateErrors.avatar.message?.toString()}</span>}
                                                </div>
                                                <div className="form-control">
                                                    <label className="label font-bold font-lg">
                                                        <span className="label-text">Cover</span>
                                                    </label>
                                                    <input 
                                                        {...updateReq('cover', {
                                                            required: false
                                                        })} 
                                                        type="file" name="cover" 
                                                        accept="image/*"
                                                        className={`file-input`}
                                                    />  
                                                    {updateErrors && updateErrors.cover && <span className="text-error">{updateErrors.cover.message?.toString()}</span>}
                                                </div>
                                                <div className="form-control">
                                                    <label className="label font-bold font-lg">
                                                        <span className="label-text">Full Name</span>
                                                    </label>
                                                    <input 
                                                        {...updateReq('fullName', options.fullName)} 
                                                        defaultValue={authData.me.profile.fullName}
                                                        type="text" name="fullName" 
                                                        className={`w-full p-3 transition duration-200 rounded input`}
                                                    />  
                                                    {updateErrors && updateErrors.fullName && <span className="text-error">{updateErrors.fullName.message?.toString()}</span>}
                                                </div>
                                                <div className="form-control">
                                                    <label className="label font-bold font-lg">
                                                        <span className="label-text">Display Name</span>
                                                    </label>
                                                    <input 
                                                        {...updateReq('displayName', options.displayName)} 
                                                        defaultValue={authData.me.profile.displayName}
                                                        type="text" name="displayName" 
                                                        className={`w-full p-3 transition duration-200 rounded input`}
                                                    />  
                                                    {updateErrors && updateErrors.displayName && <span className="text-error">{updateErrors.displayName.message?.toString()}</span>}
                                                </div>
                                                <div className="form-control">
                                                    <label className="label font-bold font-lg">
                                                        <span className="label-text">Biography</span>
                                                    </label>
                                                    <textarea 
                                                        {...updateReq('bio', options.bio)} 
                                                        defaultValue={authData.me.profile.bio || ''}
                                                        name="bio" 
                                                        className={`w-full p-3 transition duration-200 rounded textarea`}
                                                    />  
                                                    {updateErrors && updateErrors.bio && <span className="text-error">{updateErrors.bio.message?.toString()}</span>}
                                                </div>
                                                <button type="submit" disabled={isSubmitting} className={`w-full btn ${isSubmitting ? 'btn-outline' : ''}`}>
                                                    Submit
                                                </button>
                                            </form>
                                        </div>

                                        
                                    </div>
                                </div>
                                </>}
                                {/* About me */}
                                <div className="bg-base-300 rounded-lg shadow-md p-5 md:h-[14.25rem]">
                                    <h2 className="text-lg font-bold flex flex-row items-center gap-2">
                                        <MdOutlineDescription className="w-5 h-5"/>
                                        <p>About me</p>
                                    </h2>
                                    <p className="md:line-clamp-[7] line-clamp-[8]">{data.user.bio || `This user hasn't added biography`}</p>
                                </div>
                            </div>
                        </div>
                        </>
                    }
                </div>
            </main>
        </>
    )
}

export default withUrqlClient(urqlClientSsr, { ssr: true, staleWhileRevalidate: true })(Profile)
