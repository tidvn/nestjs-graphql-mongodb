import { InputType, Field } from '@nestjs/graphql';
@InputType()
export class CreateUserInput {
  @Field(() => String, { description: 'UserId' })
  _id: string;
  
  @Field(() => [Input_Info], { description: 'Information' })
  info: Input_Info[];
}


@InputType()
class Input_Info {
  @Field(() => String, { description: 'Name' })
  name: string;

  @Field(() => String, { description: 'Value' })
  value: string;
  
  @Field(() => Boolean, { description: 'Private' })
  private: boolean;
}