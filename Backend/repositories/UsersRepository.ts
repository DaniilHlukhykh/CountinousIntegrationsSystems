import type { Repository } from "typeorm";
import { dataSource } from "../config/DataSource.js";
import { UserEntity } from "../entities/UserEntity.js";
import type { UserData } from "../interfaces/UserData.js";

export class UsersRepository {
  private readonly userRepository: Repository<UserEntity>;

  constructor() {
    this.userRepository = dataSource.getRepository(UserEntity);
  }

  async getByEmail(email: string): Promise<UserEntity | null> {
    return this.userRepository.findOneBy({ email: email });
  }

  async getById(id: number): Promise<UserEntity | null> {
    return this.userRepository.findOneBy({ id: id });
  }

  async create(data: UserData): Promise<UserEntity> {
    const newUser = this.userRepository.create(data);
    return this.userRepository.save(newUser);
  }
}
