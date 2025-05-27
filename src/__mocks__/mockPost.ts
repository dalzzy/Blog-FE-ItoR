import { faker } from '@faker-js/faker';

export const mockPosts = Array.from({ length: 100 }, (_, i) => {
  const now = new Date();

  const randomMinutesAgo = faker.number.int({ min: 0, max: 7200 });
  const createdAt = new Date(now.getTime() - randomMinutesAgo * 60 * 1000).toISOString();

  const commentCount = faker.number.int({ min: 0, max: 20 });

  const comments = Array.from({ length: commentCount }, (_, idx) => ({
    id: idx + 1,
    nickName: faker.internet.username(),
    profileImage: faker.image.avatar(),
    createAt: createdAt,
    content: faker.lorem.sentence(),
  }));

  return {
    id: i + 1,
    title: faker.lorem.words(),
    content: Math.random() < 0.5 ? faker.lorem.paragraph() : faker.lorem.paragraphs(5),
    nickName: faker.internet.username(),
    createAt: createdAt,
    image:
      Math.random() < 0.5 ? `https://picsum.photos/seed/${faker.string.uuid()}/220/220` : undefined,
    commentCount: commentCount,
    comments: comments,
    profileImage: faker.image.avatar(),
  };
});
