import { faker } from "@faker-js/faker";
import { dataSource } from "./config/DataSource.js";
import { UserEntity } from "./entities/UserEntity.js";
import { NewspostEntity } from "./entities/NewspostEntity.js";
import { Genre } from "./Genre.js";

async function seed(): Promise<void> {
  await dataSource.initialize();
  console.log("Connected");
  const userRepository = dataSource.getRepository(UserEntity);
  const existingUser = await userRepository.findOneBy({
    email: "user2@example.com",
  });
  const savedUser =
    existingUser ??
    (await userRepository.save({
      email: "user2@example.com",
      password: "password",
    }));
  console.log("User created", savedUser.id);
  const newspostRepository = dataSource.getRepository(NewspostEntity);
  const newsposts = [];
  for (let index = 0; index < 20; index++) {
    newsposts.push({
      header: faker.lorem.sentence(5),
      text: faker.lorem.paragraph(),
      genre: Genre.Politic,
      isPrivate: false,
      author: { id: savedUser.id },
    });
  }
  await newspostRepository.save(newsposts);
  console.log("Newsposts created", newsposts.length);
  await dataSource.destroy();
}

await seed();
