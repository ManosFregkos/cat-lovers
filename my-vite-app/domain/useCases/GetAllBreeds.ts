import {CatRepository} from "../repositories/CatRepository";
import {Breed} from "../entities/Breeds.ts";

export class GetAllBreeds {
  constructor(private readonly repository: CatRepository) {}

  async execute(): Promise<Breed[]> {
    return await this.repository.getAllBreeds();
  }
}