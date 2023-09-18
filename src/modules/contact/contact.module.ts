import { Module } from '@nestjs/common';
import { ContactService } from './contact.service';
import { ContactResolver } from './contact.resolver';
import { Contact, ContactSchema} from './contact.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      {name: Contact.name, schema: ContactSchema}
    ])
  ],
  providers: [ContactResolver, ContactService]
})
export class ContactModule {}
