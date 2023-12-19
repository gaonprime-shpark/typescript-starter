import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AsyncTryCatch } from './decorator/tryCatch.decorator';
import { User } from './entities/users.entity';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  @AsyncTryCatch()
  async findUsers(): Promise<User[]> {
    return this.usersService.findUsers();
  }

  @Post('/login')
  @AsyncTryCatch()
  async login(@Body() dto: User): Promise<any> {
    const result = await this.usersService.login(dto);
    console.log(`result :`, result);
    return result;
  }

  @Post()
  @AsyncTryCatch()
  async createUser(@Body() dto: User): Promise<User[]> {
    console.log(`createUser Dto :`, dto);
    await this.usersService.create(dto);
    return this.usersService.findUsers();
  }

  @Get('/cats/:userId')
  @AsyncTryCatch()
  async myCats(@Param('userId') userId: string) {
    return await this.usersService.myCats(userId);
  }
}
