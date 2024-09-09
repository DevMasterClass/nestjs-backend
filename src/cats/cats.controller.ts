import {
  Controller,
  Get,
  Post,
  Body,
  BadRequestException,
  ConflictException,
} from '@nestjs/common';
import { CatsService } from './cats.service';
import { CreateCatDto } from './dto/create-cat.dto';
import { Cat } from './interfaces/cat.interface';
import { Cat as CatEntity } from './cats.entity';

@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Get()
  async findAll(): Promise<CatEntity[]> {
    return await this.catsService.findAll();
  }

  @Post()
  async create(@Body() createCatDto: CreateCatDto): Promise<any> {
    console.log('Did you see me?');
    try {
      const catNames = createCatDto.name.split(' ');
      const { age, breed } = createCatDto;
      const payload: Cat = {
        name: catNames[0],
        nickname: catNames[1],
        age,
        breed,
      };

      const savedCat = await this.catsService.create(payload);
      console.log(savedCat);

      return {
        statusCode: 200,
        message: 'Cat saved successfully.',
        data: savedCat,
      };
    } catch (error) {
      if (error instanceof ConflictException) {
        // Handle conflict error (cat already exists)
        throw new ConflictException(`Error: ${error.message}`);
      } else {
        // Handle other potential errors
        throw new BadRequestException(
          `Error occurred while adding the cat: ${error.message}`,
        );
      }
    }
  }
}
