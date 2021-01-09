import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { User } from './users.model';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async insertUser(first_name: string, desc: string, email: string) {
    const newUser = new this.userModel({
      first_name,
      last_name: desc,
      email,
    });
    const result = await newUser.save();
    return result;
  }

  async getUsers() {
    const users = await this.userModel.find().exec();
    return users.map(user => ({
      id: user.id,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
    }));
  }

  async getSingleUser(userId: string) {
    const user = await this.findUser(userId);
    return {
      id: user.id,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
    };
  }

  async updateUser(userId: string, first_name: string, desc: string, email: string) {
    const updatedUser = await this.findUser(userId);
    if (first_name) {
      updatedUser.first_name = first_name;
    }
    if (desc) {
      updatedUser.last_name = desc;
    }
    if (email) {
      updatedUser.email = email;
    }
    updatedUser.save();
    return updatedUser;
  }

  async deleteUser(userId: string) {
    const result = await this.userModel.deleteOne({ _id: userId }).exec();
    if (result.n === 0) {
      throw new NotFoundException('Could not find user.');
    }
    return true;
  }

  private async findUser(id: string): Promise<User> {
    let user;
    try {
      user = await this.userModel.findById(id).exec();
    } catch (error) {
      throw new NotFoundException('Could not find user.');
    }
    if (!user) {
      throw new NotFoundException('Could not find user.');
    }
    return user;
  }

  async findOne(email: string): Promise<User | undefined> {
    let user;
    try {
      user = await this.userModel.findOne({email: email}).exec();
      
    } catch (error) {
      throw new NotFoundException('Could not find user.');
    }
    if (!user) {
      throw new NotFoundException('Could not find user.');
    }
    return user;
  }
}