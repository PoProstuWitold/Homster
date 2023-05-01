import { UseGuards } from '@nestjs/common'
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql'
import { FileUpload, GraphQLUpload } from 'graphql-upload-minimal'
import * as fs from 'node:fs'
import { join } from 'node:path'
import { SessionGuard } from '../common/guards'
import { CreateUserInput, UpdateUserInput } from '../common/dtos'
import { Profile, User } from '../common/entities'
import { 
    GqlFastifyContext, 
    CursorPaginatedUsers, 
    CursorPaginationOptions 
} from '../common/types'
import { UserService } from './user.service'
import { UploaderService } from '../uploader/uploader.service'
import { Mimetype } from '../uploader/uploader.service'

@Resolver(() => User)
export class UserResolver {
    constructor( 
        private readonly userService: UserService,
        private readonly uploaderService: UploaderService 
    ) {}

    @Query(() => User, { name: 'user' })
    public async getUser(
        @Args('field') field: string,
        @Args('value') value: string
    ): Promise<User> {
        try {
            const user = await this.userService.findOneByField(field, value, { throwError: true, includeRelations: true })
            
            return user
        } catch (err) {
            throw err
        }
    }

    @UseGuards(SessionGuard)
    @Mutation(() => Profile)
    public async updateUser(
        @Args('values') values: UpdateUserInput,
        @Args({name: 'avatar', type: () => GraphQLUpload, nullable: true}) avatar: FileUpload,
        @Args({name: 'cover', type: () => GraphQLUpload, nullable: true}) cover: FileUpload,
        @Context() ctx: GqlFastifyContext
    ): Promise<User> {
        try {
            const session = await ctx.req.session.get('user')

            if(avatar) {
                let oldAvatar = session.avatar.substring(session.avatar.lastIndexOf('/') + 1)
                const path = join('public', 'uploads', oldAvatar)
                if(oldAvatar && fs.existsSync(path)) {
                    fs.unlink(path, (err) => {
                        if(err) throw err
                        console.log('Old avatar deleted succesfully')
                    })
                }
                const avatarFile = await this.uploaderService.uploadFile({
                    name: 'User avatar',
                    description: 'New user avatar'
                }, avatar, [Mimetype.PNG, Mimetype.JPG])
                values.avatar = avatarFile.url
            }

            if(cover) { 
                let oldCover = session.cover.substring(session.cover.lastIndexOf('/') + 1)
                const path = join('public', 'uploads', oldCover)
                if(oldCover && fs.existsSync(path)) {
                    fs.unlink(path, (err) => {
                        if(err) throw err
                        console.log('Old cover deleted succesfully')
                    })
                }
                const coverUrl = await this.uploaderService.uploadFile({
                    name: 'Cover',
                    description: 'Cover image of user'
                }, cover, [Mimetype.PNG, Mimetype.JPG])
                values.cover = coverUrl.url
            }
            
            const user = await this.userService.update(session.id, values)
            ctx.req.session.set('user', user)

            return user
        } catch (err) {
            console.error(err)
        }
    }

    @Query(() => CursorPaginatedUsers, { name: 'users' })
    public async getUsers(@Args('paginationOptions') paginationOptions: CursorPaginationOptions): Promise<CursorPaginatedUsers> {
        try {
            const { edges, pageInfo } = await this.userService.findAll(paginationOptions)

            return {
                edges,
                pageInfo
            }
        } catch (err) {
            throw err
        }
    }

    @Mutation(() => User)
    public async createUser(@Args('createUserInput') data: CreateUserInput): Promise<User> {
        try {
            const user = await this.userService.create(data)
            return user
        } catch (err) {
            throw err
        }
    }
}