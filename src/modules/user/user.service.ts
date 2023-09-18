import { Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { Model } from 'mongoose';
import { User } from './user.schema';
import { InjectModel } from '@nestjs/mongoose';
import axios from 'axios';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
  ) {}

  create(createUserInput: CreateUserInput) {
    try{
      const user = new this.userModel(createUserInput);
      return user.save();
    }
    catch (error) {
      return new Error(error.message)
    }
  }

  async findAll() {
    try{
      const user = await this.userModel.find();

      if (!user) {
        return "User not found"
      }
      return user;
    }
    catch (error) {
      return new Error(error.message)
    }
  }

  async findOne(id: string) {
    try{
      const user = await this.userModel.findOne({ _id: id }).exec();

    if (!user) {
      return "User not found"
    }
    const apiUrl = `https://xnft-api-server.xnfts.dev/v1/users?user_id=${id}`;
    const response = await axios.get(apiUrl);
    const {username,image,publicKeys} = response.data.user
    user.publicKeys= publicKeys
    user.username = username
    user.image=image
    return user
    }
    catch (error) {
      return new Error(error.message)
    }
  }

  update(id: string, updateUserInput: UpdateUserInput) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
