import {
  ArgumentMetadata,
  Injectable,
  NotFoundException,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class CustomPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    console.log(`value :`, value);
    console.log(`metadata :`, metadata);

    // if (typeof value === 'string') {
    //   throw new NotFoundException('customPiper Error');
    // } else {
    // }
    return value;
  }
}
