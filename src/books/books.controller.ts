import { Controller,Post,Body,Get,Param,Patch,Delete,HttpStatus } from '@nestjs/common';

import { BooksService } from './books.service';

@Controller('books')
export class BooksController {
    constructor(private readonly booksService: BooksService) { }

    @Post()
    async addBook(
        @Body('title') bookTitle: string,
        @Body('description') bookDesc: string,
        @Body('price') bookPrice: number,
    ) {
        const book = await this.booksService.insertBook(
            bookTitle,
            bookDesc,
            bookPrice,
        );
        return {
            statusCode: HttpStatus.OK,
            message: 'Book added successfully',
            data: book,
        };
    }

    @Get()
    async getAllBooks() {
        const books = await this.booksService.getBooks();
        return books;
    }

    @Get(':id')
    getBook(@Param('id') bookId: string) {
        return this.booksService.getSingleBook(bookId);
    }

    @Patch(':id')
    async updateBook(
        @Param('id') bookId: string,
        @Body('title') bookTitle: string,
        @Body('description') bookDesc: string,
        @Body('price') bookPrice: number,
    ) {
        const book = await this.booksService.updateBook(
            bookId,
            bookTitle,
            bookDesc,
            bookPrice,
        );
        return {
            statusCode: HttpStatus.OK,
            message: 'Book updated successfully',
            book: book,
        };
    }

    @Delete(':id')
    async removeBook(@Param('id') bookId: string) {
        const isDeleted = await this.booksService.deleteBook(bookId);
        if (isDeleted) {
            return {
                statusCode: HttpStatus.OK,
                message: 'book deleted successfully',
            };
        }
    }
}