import { Inject, Injectable, Logger, ValidationPipe } from '@nestjs/common';
import { Model } from 'mongoose';
import { CAT_MODEL } from 'src/db/db.constants';
import { Cat } from 'src/interface/cat.interface';
import { AsyncTryCatch } from 'src/users/decorator/tryCatch.decorator';

@Injectable()
export class CatsService {
  constructor(
    @Inject(CAT_MODEL)
    private catModel: Model<Cat>,
  ) {}
  async create(createCatDto: Cat): Promise<Cat> {
    const createdCat = new this.catModel(createCatDto);
    return createdCat.save();
  }
  async delete(catId: string): Promise<any> {
    const deleteCat = await this.catModel.deleteOne({ _id: catId }).exec();
    Logger.verbose(deleteCat);
    return deleteCat;
  }
  async patch(catDto: Cat): Promise<any> {
    console.log(`catDto :`, catDto);
    const patchCat = await this.catModel
      .updateOne({ _id: catDto._id }, { ...catDto })
      .exec();
    Logger.verbose(patchCat);
  }
  async findAll(): Promise<Cat[]> {
    return this.catModel.find().exec();
  }
  async findByName(name: string): Promise<Cat[]> {
    console.log(`검색한 name :`, name);

    const searchResult = await this.catModel.find({
      name: { $regex: name, $options: 'i' },
    });
    // const searchResult = await this.catModel.find({
    //   $text: { $search: name },
    // });

    console.log(`검색결과 :`, searchResult);
    return searchResult;
  }
}
