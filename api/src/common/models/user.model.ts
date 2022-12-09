import { Field, ObjectType, EnumOptions } from '@nestjs/graphql'

export enum Roles {
    Student = 'student',
    Instructor = 'instructor'
}

@ObjectType()
export class UserModel {

    @Field(() => String)
    public displayName: string

    @Field(() => String)
    public fullName: string

    @Field()
    public role: Roles

    @Field(() => String)
    public email: string

    public password: string

}