import { Args, Query, Resolver } from '@nestjs/graphql'

import { Roles, UserModel } from '../common/models'
import { UserService } from './user.service'


const users: UserModel[] = [
    {
        displayName: 'witek',
        fullName: 'Witold Zawada',
        email: 'wit@email.com',
        role: Roles.Student,
        password: 'password'
    }
]

@Resolver(_of => UserModel)
export class UserResolver {
    constructor(
        private readonly userService: UserService
    ) {}

    @Query(() => UserModel)
    async author(@Args('id', { type: () => String }) id: string) {
        return
    }
}