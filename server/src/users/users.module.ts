import { Module } from '@nestjs/common';

@Module({
  exports: [UsersModule],
})
export class UsersModule {}
