import type { NewspostsRepository } from "../repositories/NewspostsRepository.js";
import type { NewspostsParams } from "../interfaces/NewspostsParams.js";
import type { NewspostData } from "../interfaces/NewspostData.js";
import { ValidationError } from "../errors/ValidationError.js";
import {
  validateNewspostUpdate,
  validateNewspost,
} from "../validators/NewspostValidator.js";
import { NewspostsServiceError } from "../errors/NewspostsServiceError.js";
import type { NewspostEntity } from "../entities/NewspostEntity.js";
import type { NewspostResponse } from "../interfaces/NewspostResponse.js";

export class NewspostsService {
  private readonly newspostsRepository: NewspostsRepository;

  constructor(newspostsRepository: NewspostsRepository) {
    this.newspostsRepository = newspostsRepository;
  }

  async getById(id: number): Promise<NewspostResponse | null> {
    const existingNewspost = await this.execute(() =>
      this.newspostsRepository.getById(id),
    );
    if (existingNewspost === null) {
      return null;
    }
    return this.toResponse(existingNewspost);
  }

  async create(
    data: NewspostData,
    authorId: number,
  ): Promise<NewspostResponse> {
    const validationResult = validateNewspost(data);

    if (Array.isArray(validationResult)) {
      throw new ValidationError(
        validationResult.map((error) => error.message).join(", "),
      );
    }

    const createdNewspost = await this.execute(() =>
      this.newspostsRepository.create(data, authorId),
    );
    if (createdNewspost === null) {
      throw new NewspostsServiceError("Created newspost was not found");
    }
    return this.toResponse(createdNewspost);
  }

  async update(
    id: number,
    data: Partial<NewspostData>,
  ): Promise<NewspostResponse | null> {
    const validationResult = validateNewspostUpdate(data);

    if (Array.isArray(validationResult)) {
      throw new ValidationError(
        validationResult.map((error) => error.message).join(", "),
      );
    }

    const updatedNewspost = await this.execute(() =>
      this.newspostsRepository.update(id, data),
    );
    if (updatedNewspost === null) {
      return null;
    }
    return this.toResponse(updatedNewspost);
  }

  async delete(id: number): Promise<number> {
    return this.execute(() => this.newspostsRepository.delete(id));
  }

  async getAll(params: NewspostsParams): Promise<NewspostResponse[]> {
    const newsposts = await this.execute(() =>
      this.newspostsRepository.getAll(params),
    );
    return newsposts.map((newspost) => this.toResponse(newspost));
  }

  throwError(): never {
    throw new NewspostsServiceError(
      "This is a demo error from NewspostsService",
    );
  }

  private toResponse(newspost: NewspostEntity): NewspostResponse {
    return {
      id: newspost.id,
      title: newspost.header,
      text: newspost.text,
      genre: newspost.genre,
      isPrivate: newspost.isPrivate,
      author:
        newspost.author === null
          ? null
          : { id: newspost.author.id, email: newspost.author.email },
    };
  }

  private async execute<T>(action: () => Promise<T>): Promise<T> {
    try {
      return await action();
    } catch (error) {
      if (error instanceof ValidationError) {
        throw error;
      }
      throw new NewspostsServiceError(
        error instanceof Error ? error.message : String(error),
      );
    }
  }
}
