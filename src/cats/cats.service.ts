import { ConflictException, Injectable } from '@nestjs/common';
import { Cat } from './interfaces/cat.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cat as CatEntity } from './cats.entity';

@Injectable()
export class CatsService {
  constructor(
    @InjectRepository(CatEntity)
    private catRepository: Repository<CatEntity>,
  ) {}

  async create(cat: Cat): Promise<Cat> {
    const allCats = await this.catRepository.find();
    const existingCat = allCats.find(
      (eachCats) =>
        eachCats.name === cat.name &&
        eachCats.age === cat.age &&
        eachCats.breed === cat.breed,
    );

    if (existingCat) {
      throw new ConflictException(
        `Cat with name: ${cat.name}, age: ${cat.age}, and breed: ${cat.breed} already exists.`,
      );
    }

    try {
      const savedCat = this.catRepository.save(cat);
      return savedCat;
    } catch (error) {
      console.log(error);
      throw new Error(`Error occurred while saving cat: ${error.message}`);
    }
  }

  async findAll(): Promise<CatEntity[]> {
    return await this.catRepository.find();
  }
}
