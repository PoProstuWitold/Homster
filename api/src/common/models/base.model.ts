import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType({
    isAbstract: true
})
export abstract class BaseModel {
    @Field(() => String)
    public id: string

    @Field(() => String)
    public createdAt: Date

    @Field(() => String)
    public updatedAt: Date
}