import { Injectable } from '@nestjs/common';

// TODO: Заменить на реальный интерфейс юзера
export type User = any;

@Injectable()
export class UsersService {
  private readonly users = [
    {
      userId: 1,
      username: 'test1',
      password: 'test',
    },
    {
      userId: 2,
      username: 'test2',
      password: 'test',
    },
  ];

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find((user) => user.username === username);
  }
}
