import { Field, ObjectType } from '@nestjs/graphql'
import { CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'


@ObjectType({
    isAbstract: true
})
export abstract class BaseEntity {
    @Field(() => String)
    @PrimaryGeneratedColumn('uuid')
    public id: string

    @Field(() => String)
    @CreateDateColumn()
    public createdAt: Date

    @Field(() => String)
    @UpdateDateColumn()
    public updatedAt: Date
}