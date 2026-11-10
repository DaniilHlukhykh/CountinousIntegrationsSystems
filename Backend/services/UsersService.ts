import type { UsersRepository } from "../repositories/UsersRepository.js";
import type { RegisterData } from "../interfaces/RegisterData.js";
import { ValidationError } from "../errors/ValidationError.js";
import { validateUserRegister } from "../validators/UserValidator.js";
import { createHash } from "node:crypto";
import type { UserData } from "../interfaces/UserData.js";
import type { UserEntity } from "../entities/UserEntity.js";

export class UsersService {
  private readonly usersRepository: UsersRepository;

  constructor(usersRepository: UsersRepository) {
    this.usersRepository = usersRepository;
  }

  private hashPassword(password: string): string {
    return createHash("sha256").update(password).digest("hex");
  }

  async register(data: RegisterData): Promise<UserEntity> {
    const validationResult = validateUserRegister(data);

    if (Array.isArray(validationResult)) {
      throw new ValidationError(
        validationResult.map((error) => error.message).join(", "),
      );
    }

    if (data.password !== data.confirmPassword) {
      throw new ValidationError("Passwords do not match");
    }

    if ((await this.usersRepository.getByEmail(data.email)) !== null) {
      throw new ValidationError("Email is already in use");
    }

    const hashedPassword = this.hashPassword(data.password);

    return this.usersRepository.create({
      email: data.email,
      password: hashedPassword,
    });
  }

  async login(data: UserData): Promise<UserEntity> {
    const existingUser = await this.usersRepository.getByEmail(data.email);
    if (existingUser === null) {
      throw new ValidationError("Invalid email or password");
    }

    const hashedPassword = this.hashPassword(data.password);
    if (hashedPassword !== existingUser.password) {
      throw new ValidationError("Invalid email or password");
    }

    return existingUser;
  }

  async getById(id: number): Promise<UserEntity | null> {
    return this.usersRepository.getById(id);
  }
}
