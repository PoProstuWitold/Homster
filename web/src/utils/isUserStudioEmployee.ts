import { Profile, Studio, User } from '@/generated/graphql'

export const isUserStudioEmployee = (studio: Studio, user: User | Profile) => {
	const ids = studio.employees?.map(value => value.employee?.id)
	console.log(ids)
	console.log(user.id)
	if(studio.employees?.filter((value) => {
		value.employeeId === user.id
	})) return true
	return false
}