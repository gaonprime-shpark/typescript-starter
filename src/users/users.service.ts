import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';
import { jwtConstants } from './constants';
import { User } from './entities/users.entity';

@Injectable()
export class UsersService {
  constructor(
    @Inject('USER_MODEL')
    private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}
  async create(createUserDto: User): Promise<any> {
    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }
  async findUsers(): Promise<User[]> {
    const userList = this.userModel.find().exec();
    return userList;
  }

  async myCats(userId: string): Promise<any> {
    const userWithCats = await this.userModel
      .findOne({ _id: userId })
      .populate({ path: 'cats', populate: { path: 'user' } })
      .exec();

    // userWithCats 객체에서 cats 배열만 반환
    return userWithCats ? userWithCats.cats : [];
  }

  async login(userDto: User): Promise<any> {
    const { username, password } = userDto;
    const findUser = await this.userModel
      .findOne({ username })
      .populate('cats')
      .exec();

    console.log(`findUser :`, findUser);

    const valid = findUser.password === password;
    // const userOmit = _.omit(findUser, ['password']);
    if (valid) {
      const payload = { sub: username, username: username };

      return {
        result: true,
        profile: findUser,
        access_token: await this.jwtService.signAsync(payload, {
          privateKey: jwtConstants.secret,
          expiresIn: '60s',
        }),
      };
    } else {
      throw new UnauthorizedException();
    }
  }
}
