import { Controller,Post,Body,Get,Param,Patch,Delete,HttpStatus } from '@nestjs/common';

import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Post()
    async addUser(
        @Body('first_name') userFirstName: string,
        @Body('last_name') userLastName: string,
        @Body('email') userEmail: string,
    ) {
        const user = await this.usersService.insertUser(
            userFirstName,
            userLastName,
            userEmail,
        );
        return {
            statusCode: HttpStatus.OK,
            message: 'user added successfully',
            data: user,
        };
    }

    @Get()
    async getAllUsers() {
        const users = await this.usersService.getUsers();
        return users;
    }

    @Get(':id')
    getUser(@Param('id') userId: string) {
        return this.usersService.getSingleUser(userId);
    }

    @Patch(':id')
    async updateUser(
        @Param('id') userId: string,
        @Body('first_name') userFirstName: string,
        @Body('last_name') userLastName: string,
        @Body('email') userEmail: string,
    ) {
        const user = await this.usersService.updateUser(
            userId,
            userFirstName,
            userLastName,
            userEmail,
        );
        return {
            statusCode: HttpStatus.OK,
            message: 'user updated successfully',
            user: user,
        };
    }

    @Delete(':id')
    async removeUser(@Param('id') userId: string) {
        const isDeleted = await this.usersService.deleteUser(userId);
        if (isDeleted) {
            return {
                statusCode: HttpStatus.OK,
                message: 'user deleted successfully',
            };
        }
    }
}