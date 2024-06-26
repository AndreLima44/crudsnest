import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  private users: User[] = [];

  findAll(): User[] {
    return this.users;
  }

  findOne(id: number): User {
    return this.users.find(user => user.id === id);
  }

  findOneByUsername(username: string): User {
    return this.users.find(user => user.username === username);
  }

  create(createUserDto: CreateUserDto): User {
    const user = {
      id: this.users.length + 1,
      ...createUserDto,
    };
    this.users.push(user);
    return user;
  }

  update(id: number, updateUserDto: UpdateUserDto): User {
    const user = this.findOne(id);
    if (user) {
      Object.assign(user, updateUserDto);
    }
    return user;
  }

  delete(id: number): void {
    this.users = this.users.filter(user => user.id !== id);
  }
}
