import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ObjectType, Field } from '@nestjs/graphql';
import { Document } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

@Schema({ collection: 'Users' })
@ObjectType()
export class User {
  @Prop({
    type: String,
    default: function genUUID() {
      return uuidv4();
    },
  })
  @Field(() => String, { description: 'UserID' })
  _id: string;

  @Prop()
  @Field(() => String, { description: 'UserName' })
  username: string;

  @Field(() => [Public_Key], { description: 'Public Keys' })
  publicKeys: Public_Key[];

  @Prop()
  @Field(() => String, { description: 'Image' })
  image: string;

  @Prop([
    {
      _id: false,
      name: String,
      value: String,
      private: Boolean,
    },
  ])
  @Field(() => [Info], { description: 'Custom Data' })
  info: Info[];
}

@ObjectType()
class Public_Key {
  @Field(() => String, { description: 'Blockchain' })
  blockchain: string;

  @Field(() => String, { description: 'Public Key' })
  publicKey: string;
}
@ObjectType()
class Info {
  @Field(() => String, { description: 'Name' })
  name: string;

  @Field(() => String, { description: 'Value' })
  value: string;

  @Field(() => Boolean, { description: 'private' })
  private: boolean;
}


export type UserDocument = User & Document;
export const UserSchema = SchemaFactory.createForClass(User);
