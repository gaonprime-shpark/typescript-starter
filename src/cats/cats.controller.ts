import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Logger,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { Cat } from 'src/interface/cat.interface';
import { CatsService } from './cats.service';
import { Roles } from 'src/users/decorator/roles.decorator';
import { UserRole } from 'src/users/entities/users.entity';
import { RolesGuard } from 'src/users/guard/roles.guard';
import { AuthGuard } from 'src/users/guard/token.guard';
import { CustomPipe } from './cats.pipe';
@Controller('cats')
// @Roles(...Object.values(UserRole))
export class CatsController {
  constructor(private catsService: CatsService) {}

  @Post()
  @Roles('Admin', 'Customer')
  @UseGuards(AuthGuard, RolesGuard)
  async create(@Body() createCatDto: Cat) {
    console.log(`createCatDto :`, createCatDto);
    for (const value of Object.values(createCatDto)) {
      console.log(value);
      if (value === '') {
        throw new HttpException('empry value !', 404);
      }
    }

    this.catsService.create(createCatDto);
    return this.catsService.findAll();
  }

  @Delete()
  async delete(@Req() req): Promise<Cat[]> {
    const catId = req.body._id;
    console.log(`body :`, req.body);
    this.catsService.delete(catId);
    return this.catsService.findAll();
  }

  @Patch()
  async patch(@Body() patchCatDto: Cat) {
    console.log(`patchCatDto :`, patchCatDto);
    console.log(`patchCatDto._id :`, patchCatDto._id);
    const { _id, name, age } = patchCatDto;
    this.catsService.patch(patchCatDto);
    return this.catsService.findAll();
  }

  @Post('/:id')
  @Roles('Admin', 'Customer')
  async findById(@Param('id', new CustomPipe()) param: string) {
    console.log(`param :`, param);
  }

  @Get()
  async findAll(): Promise<Cat[]> {
    return this.catsService.findAll();
  }

  @Get('/:name')
  async findByName(@Param('name') name: string) {
    return this.catsService.findByName(name);
  }
}
