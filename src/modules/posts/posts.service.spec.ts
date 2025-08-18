import { Test } from "@nestjs/testing";
import { getModelToken } from '@nestjs/sequelize';
import { PostsService } from "./posts.service";
import { Post } from "./models/post.model";
import { PostTags } from "./models/postTags.model";
import { UserService } from "../user/user.service";
import { ConfigService } from "@nestjs/config";

describe("PostsService", () => {
  let postsService: PostsService;

  const mockPostModel = {
    findAll: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    sequelize: {
      transaction: jest.fn().mockResolvedValue({
        commit: jest.fn(),
        rollback: jest.fn(),
      }),
    },
  };

  const mockPostTagsModel = {
    create: jest.fn(),
  };

  const mockUserService = {
    findUserById: jest.fn(),
  };

  const mockConfigService = {
    get: jest.fn().mockReturnValue('http://static/posts/'),
  };

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        PostsService,
        { provide: getModelToken(Post), useValue: mockPostModel },
        { provide: getModelToken(PostTags), useValue: mockPostTagsModel },
        { provide: UserService, useValue: mockUserService },
        { provide: ConfigService, useValue: mockConfigService },
      ],
    }).compile();

    postsService = moduleRef.get(PostsService);
    jest.clearAllMocks();
  });

  it('should return an array of all posts', async () => {
    mockPostModel.findAll.mockResolvedValueOnce([{ id: 1 }]);
    await expect(postsService.getPosts()).resolves.toEqual([{ id: 1 }]);
    expect(mockPostModel.findAll).toHaveBeenCalledWith(
      expect.objectContaining({ include: expect.any(Array) }),
    );
  });

  it('should return post', async () => {
    mockPostModel.findOne.mockResolvedValueOnce({ id: 1 });
    await expect(postsService.getPostById(1)).resolves.toEqual({ id: 1 });
    expect(mockPostModel.findOne).toHaveBeenCalledWith(
      expect.objectContaining({
        where: { id: 1 },
        attributes: expect.objectContaining({
          exclude: expect.arrayContaining(['createdAt', 'userId']),
        }),
        include: expect.any(Array),
      })
    );
  });


  it('should create post', async () => {
    const t = { commit: jest.fn(), rollback: jest.fn() };
    mockPostModel.sequelize.transaction.mockResolvedValueOnce(t);
    const file = { filename: 'img.jpg' } as any;

    mockPostModel.create.mockResolvedValueOnce({ dataValues: { id: 10 } });
    mockPostTagsModel.create.mockResolvedValue(undefined);
    mockConfigService.get.mockReturnValueOnce('http://static/posts/');

    mockPostModel.findOne = jest.fn().mockResolvedValueOnce({ id: 10 });

    await postsService.createPost(1, { title: 'tеstoTTT', text: 'tеstoTTTtеstoTTT', tags: [1, 2] } as any, file);

    expect(mockPostModel.create).toHaveBeenCalledWith(
      expect.objectContaining({
        userId: 1,
        imageUrl: 'http://static/posts/img.jpg',
      }),
      { transaction: t },
    );
    expect(mockPostTagsModel.create).toHaveBeenCalledTimes(2);
    expect(t.commit).toHaveBeenCalled();
  });
});
