import type { Repository } from "typeorm";
import { dataSource } from "../config/DataSource.js";
import { NewspostEntity } from "../entities/NewspostEntity.js";
import type { NewspostsParams } from "../interfaces/NewspostsParams.js";
import type { NewspostData } from "../interfaces/NewspostData.js";

export class NewspostsRepository {
  private readonly newspostRepository: Repository<NewspostEntity>;

  constructor() {
    this.newspostRepository = dataSource.getRepository(NewspostEntity);
  }

  async getById(id: number): Promise<NewspostEntity | null> {
    return this.newspostRepository.findOne({
      where: { id: id },
      relations: { author: true },
    });
  }

  async create(
    data: NewspostData,
    authorId: number,
  ): Promise<NewspostEntity | null> {
    const newNewspost = this.newspostRepository.create({
      header: data.title,
      text: data.text,
      genre: data.genre,
      isPrivate: data.isPrivate,
      author: { id: authorId },
    });
    const savedNewspost = await this.newspostRepository.save(newNewspost);
    return this.getById(savedNewspost.id);
  }

  async update(
    id: number,
    data: Partial<NewspostData>,
  ): Promise<NewspostEntity | null> {
    const updateData: Partial<NewspostEntity> = {};
    if (data.title !== undefined) {
      updateData.header = data.title;
    }
    if (data.text !== undefined) {
      updateData.text = data.text;
    }
    if (data.isPrivate !== undefined) {
      updateData.isPrivate = data.isPrivate;
    }
    if (data.genre !== undefined) {
      updateData.genre = data.genre;
    }
    await this.newspostRepository.update(id, updateData);
    return this.getById(id);
  }

  async delete(id: number): Promise<number> {
    const deleteResult = await this.newspostRepository.delete(id);
    if (deleteResult.affected === 0) {
      throw new Error("Newspost not found");
    }
    return id;
  }

  async getAll(params: NewspostsParams): Promise<NewspostEntity[]> {
    return this.newspostRepository.find({
      relations: { author: true },
      order: { id: "ASC" },
      skip: params.page * params.size,
      take: params.size,
    });
  }
}
