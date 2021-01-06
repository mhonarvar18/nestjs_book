import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { BooksController } from './books.controller';
import { BooksService } from './books.service';
import { BooksSchema } from './books.model';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Book', schema: BooksSchema }])],
  controllers: [BooksController],
  providers: [BooksService],
})
export class BooksModule {}