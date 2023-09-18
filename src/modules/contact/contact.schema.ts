import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ObjectType, Field } from '@nestjs/graphql';
import { Schema as MongooseSchema,Document } from 'mongoose';

@Schema({ collection: 'Contact' })
@ObjectType()
export class Contact {
  @Field(() => String, { description: 'ContactId' })
  _id: MongooseSchema.Types.ObjectId;
  
  @Prop()
  @Field(() => String, { description: 'User 1' })
  user1: string;
  @Prop()
  @Field(() => String, { description: 'User 2' })
  user2: string;
  
  @Prop({ default: false })
  @Field(() => Boolean, { description: 'Is Contacted' })
  isContacted: boolean;

  @Prop({ default: Date.now })
  @Field(() => Date, { description: 'Timestamp' })
  timestamp: Date;
}

export type ContactDocument = Contact & Document;
export const ContactSchema = SchemaFactory.createForClass(Contact);
