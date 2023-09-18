import { Injectable } from '@nestjs/common';
import { CreateContactInput } from './dto/create-contact.input';
import { UpdateContactInput } from './dto/update-contact.input';
import { Model } from 'mongoose';
import { Contact } from './contact.schema';
import { InjectModel } from '@nestjs/mongoose';
import axios from 'axios';

@Injectable()
export class ContactService {
  constructor(
    @InjectModel(Contact.name)
    private readonly contactModel: Model<Contact>,
  ) {}

  async create(createContactInput: CreateContactInput) {
    try{
      const existingContact = await this.contactModel.findOne(createContactInput);
      if (existingContact) {
        throw new Error('Already exists in Contacts');
      }
      const contact = new this.contactModel(createContactInput);
      return contact.save();
    }
    catch (error) {
      return new Error(error.message)
    }
  }

  async findAll() {
    try{
      const contact = await this.contactModel.find();

      if (!contact) {
        return "Contact not found"
      }
      return contact;
    }
    catch (error) {
      return new Error(error.message)
    }
  }

  async findOne(id: string) {
    try{
      const contact = await this.contactModel.findOne({ _id: id }).exec();

    if (!contact) {
      return "Contact not found"
    }
    return contact
    }
    catch (error) {
      return new Error(error.message)
    }
  }

  update(id: string, updateContactInput: UpdateContactInput) {
    return `This action updates a #${id} contact`;
  }

  remove(id: number) {
    return `This action removes a #${id} contact`;
  }
}
