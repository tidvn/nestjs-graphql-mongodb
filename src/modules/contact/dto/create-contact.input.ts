import { InputType, Field } from '@nestjs/graphql';
@InputType()
export class CreateContactInput { 
    
  @Field(() => String, { description: 'User 1' })
  user1: string;

  @Field(() => String, { description: 'User 2' })
  user2: string;

  // @Field(() => Boolean, { description: 'Is Contacted' })
  // isContacted: boolean;
}


