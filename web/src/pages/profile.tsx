import { withUrqlClient } from 'next-urql'
import Head from 'next/head'
import Image from 'next/image'
import dayjs from 'dayjs'
import { GiInfo } from 'react-icons/gi'
import { IoGameControllerOutline } from 'react-icons/io5'
import { IoMdStats } from 'react-icons/io'
import { GiPartyPopper, GiCakeSlice } from 'react-icons/gi'
import { MdOutlineDescription } from 'react-icons/md'
import { AiOutlineEdit } from 'react-icons/ai'
import { toast } from 'react-hot-toast'
import { useForm } from 'react-hook-form'

import { urqlClientSsr } from '@/lib/urql/initUrqlClient'
import { useMeQuery, useUpdateUserMutation } from '@/generated/graphql'

const imageUrl = `http://localhost:4000/public/uploads/f4f014d8-0972-408a-ab3f-5d894b6f9f77__pollub-logo.png`

function Profile() {
    const [{
        data
    }] = useMeQuery()

    const [, updateUser] = useUpdateUserMutation()

    const handleProfileUpdate = async (data: any) => {
        try {
            const res = await updateUser({
                values: {
                    ...data
                }
            })
            console.log('res', res)
			if(!res.data || res.error?.graphQLErrors[0].originalError) {
                //@ts-ignore
                const errors = res.error?.graphQLErrors[0].originalError.errors
                
                toast.error(errors.displayName || errors.fullName || 'Failed to update profile', {
                    duration: 3000
                })
            }
            if(res && res.data && res.data.updateUser) {
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
				<title>Your profile</title>
			</Head>
            <main>
                <div className="flex flex-col min-h-screen md:p-10 p-4">
                    {data && data.me && data.me.profile &&
                        <>
                        {/* PROFILE PAGE HEADER */}
                        <div className="flex md:flex-row flex-col md:justify-between justify-center gap-6">
                            <div className="">
                                <h1 className="text-4xl font-bold">{data.me.profile.displayName}</h1>
                                <h3 className="text-lg">{data.me.profile.fullName}</h3>
                            </div>
                            <div className="flex flex-row gap-2">
                                <div>
                                    <button className="btn btn-secondary btn-outline">Wishlist</button>
                                </div>
                                <div>
                                    <button className="btn btn-secondary">Add Friend</button>
                                </div>
                            </div>
                        </div>
                        {/* MAIN CONTENT */}
                        <div className="flex flex-col lg:flex-row mt-8 gap-6">
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
                                        <p>{data.me.profile.displayName}</p>
                                    </div>
                                    <div className="">
                                        <h3 className="text-md font-bold">Full Name</h3>
                                        <p>{data.me.profile.fullName}</p>
                                    </div>
                                    <div className="">
                                        <h3 className="text-md font-bold">Email</h3>
                                        <p>{data.me.profile.email}</p>
                                    </div>
                                    <div className="">
                                        <h3 className="text-md font-bold">Role</h3>
                                        <p>{data.me.profile.role}</p>
                                    </div>
                                </div>
                                {/* Stats */}
                                <div className="flex flex-col bg-base-300 rounded-lg shadow-md p-5 lg:h-44 gap-4">
                                    <h2 className="text-lg font-bold flex flex-row items-center gap-2">
                                        <IoMdStats className="w-5 h-5"/>
                                        <p>Stats</p>
                                    </h2>
                                    <div className="flex flex-row gap-2">
                                        <h3 className="text-md font-bold">Friends:</h3>
                                        <span>0</span>
                                    </div>
                                    <div className="flex flex-row gap-2">
                                        <h3 className="text-md font-bold">Games:</h3>
                                        <span>0</span>
                                    </div>
                                </div>
                                {/* Member since   */}
                                <div className="flex flex-col bg-base-300 rounded-lg shadow-md p-5 gap-6">
                                    <div className="flex flex-row gap-2 text-center items-center">
                                        <h2 className="text-lg font-bold flex flex-row items-center gap-2">
                                            <GiPartyPopper className="w-5 h-5"/>
                                            <p>Joined</p>
                                        </h2>
                                        <p className="italic">{dayjs(new Date(data.me.profile.createdAt)).format('DD MMMM YYYY')}</p>
                                    </div>
                                    <div className="flex flex-row gap-2 text-center items-center">
                                        <h2 className="text-lg font-bold flex flex-row items-center gap-2">
                                            <GiCakeSlice className="w-5 h-5"/>
                                            <p>Last active</p>
                                        </h2>
                                        <p className="italic">{dayjs(new Date(data.me.profile.updatedAt)).format('DD MMMM YYYY')}</p>
                                    </div>
                                </div>
                            </div>
                            {/* Recent games, About me, Edit */}
                            <div className="flex flex-col lg:w-3/4 gap-6">
                                {/* Recent games */}
                                <div className="flex flex-col bg-base-300 rounded-lg shadow-md p-5 lg:h-72 gap-4">
                                    <h2 className="text-lg font-bold flex flex-row items-center gap-2">
                                        <IoGameControllerOutline className="w-5 h-5"/>
                                        <p>Recent games</p>
                                    </h2>
                                    <div className="grid lg:grid-cols-3 gap-4 md:grid-cols-2 grid-cols-1">
                                        <div className="bg-gray-200 rounded-lg h-24">
                                            <Image 
                                                className="bg-gray-200 rounded-lg h-full w-full"
                                                width={384} height={96}
                                                alt={`Game Image`}
                                                src={imageUrl} 
                                            />
                                        </div>
                                        <div className="bg-gray-300 rounded-lg h-24">
                                            <Image 
                                                className="bg-gray-200 rounded-lg h-full w-full"
                                                width={384} height={96}
                                                alt={`Game Image`}
                                                src={imageUrl} 
                                            />
                                        </div>
                                        <div className="bg-gray-200 rounded-lg h-24">
                                            <Image 
                                                className="bg-gray-200 rounded-lg h-full w-full"
                                                width={384} height={96}
                                                alt={`Game Image`}
                                                src={imageUrl} 
                                            />
                                        </div>
                                        <div className="rounded-lg h-24">
                                            <Image 
                                                className="bg-gray-200 rounded-lg h-full w-full"
                                                width={1920} height={1080}
                                                alt={`Game Image`}
                                                src={imageUrl} 
                                            />
                                        </div>
                                        <div className="bg-gray-200 rounded-lg h-24"></div>
                                        <div className="bg-gray-200 rounded-lg h-24"></div>
                                    </div>
                                </div>
                                {/* About me */}
                                <div className="bg-base-300 rounded-lg shadow-md p-5 md:h-[14.25rem]">
                                    <h2 className="text-lg font-bold flex flex-row items-center gap-2">
                                        <MdOutlineDescription className="w-5 h-5"/>
                                        <p>About me</p>
                                    </h2>
                                    <p className="md:line-clamp-[7] line-clamp-[8]">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam malesuada erat at convallis fringilla. Nam id auctor ex, in malesuada magna. Nunc eget ante rhoncus, placerat libero eu, ultricies turpis. Nullam consectetur mi vitae ex vulputate consequat. Nunc sollicitudin, nisl ornare faucibus tempus, leo mauris facilisis ipsum, at ultrices metus leo eget lectus. Ut a est arcu. Nunc non nulla odio. Nulla at scelerisque erat. Duis tincidunt molestie auctor. Nulla luctus, ligula semper ullamcorper consequat, arcu massa dignissim augue, quis pretium odio tellus ac orci. Aenean eu sollicitudin nulla, at mollis nibh. Pellentesque congue neque quis mollis varius. Donec ut dolor varius nisl dignissim iaculis. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nullam ultrices ipsum vitae neque malesuada pharetra nec vitae enim. Nunc imperdiet felis tempus nulla dapibus ultricies. Donec consectetur consequat orci. Etiam accumsan lacinia odio id convallis. Suspendisse in nisl mollis, feugiat dolor id, fringilla tellus. Praesent laoreet velit at orci posuere, sit amet porttitor sapien rhoncus.</p>
                                </div>
                                {/* Edit */}
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
                                                        <span className="label-text">Full Name</span>
                                                    </label>
                                                    <input 
                                                        {...updateReq('fullName', options.fullName)} 
                                                        defaultValue={data.me.profile.fullName}
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
                                                        defaultValue={data.me.profile.displayName}
                                                        type="text" name="displayName" 
                                                        className={`w-full p-3 transition duration-200 rounded input`}
                                                    />  
                                                    {updateErrors && updateErrors.displayName && <span className="text-error">{updateErrors.displayName.message?.toString()}</span>}
                                                </div>
                                                <button type="submit" disabled={isSubmitting} className={`w-full btn ${isSubmitting ? 'btn-outline' : ''}`}>
                                                    Submit
                                                </button>
                                            </form>
                                        </div>
                                    </div>
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
