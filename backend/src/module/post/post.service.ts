import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CREATE_POST, DELETE_POST } from 'src/constants/user-scores';
import { PostType } from 'src/enum/post.enum';
import { generateURL, randomCodeURL } from 'src/lib/url';
import { sliceURL } from 'src/lib/url';
import { uuidCreate } from 'src/lib/uuid/uuid-random';
import { User } from 'src/module/user/user.entity';
import { Comment } from '../comment/comment.entity';
import { CommentRepository } from '../comment/comment.repository';
import { LikeRepository } from '../like/like.repository';
import { ReplyRepository } from '../reply/reply.repository';
import { Tag } from '../tag/tag.entity';
import { TagRepository } from '../tag/tag.repository';
import { UserService } from '../user/user.service';
import {
  CreatePostInput,
  PostTagInput,
  UpdatePostInput,
} from './dto/post.input';
import { Post } from './post.entity';
import { PostRepository } from './post.repository';

@Injectable()
export class PostService {
  constructor(
    private postRepository: PostRepository,
    private commentRepository: CommentRepository,
    private replyRepository: ReplyRepository,
    private tagRepository: TagRepository,
    private likeRepository: LikeRepository,
    private userService: UserService,
  ) {}

  async create(data: CreatePostInput, user: User): Promise<Post> {
    const { thumbnail, url, tags } = data;

    const post: Post = this.postRepository.create(data);

    const existPost: Post = await this.postRepository.findOneWithUserByUrl(
      url,
      false,
    );

    if (existPost) {
      post.url = randomCodeURL(url);
    }

    const tagList: Tag[] = await this.findOrCreateTagsAndGet(tags);

    post.thumbnail = sliceURL(thumbnail);
    post.tags = tagList;
    post.user = user;
    post.uuid = uuidCreate();

    await this.userService.handleScore(user.idx, CREATE_POST);

    return await post.save();
  }

  async update(uuid: string, data: UpdatePostInput, user: User) {
    const { title, content, thumbnail, tags, isTemp, url } = data;

    const post: Post = await this.postRepository.findOneByUUID(uuid, false);

    const existPost: Post = await this.postRepository.findOneWithUserByUrl(
      url,
      false,
    );

    if (existPost) {
      post.url = randomCodeURL(url);
    }

    if (!post) {
      throw new NotFoundException('Post not found.');
    }

    if (post.userIdx !== user.idx) {
      throw new ForbiddenException('No permission.');
    }

    const tagList: Tag[] = await this.findOrCreateTagsAndGet(tags);

    post.title = title || post.title;
    post.content = content || post.content;
    post.thumbnail = sliceURL(thumbnail) || post.thumbnail;
    post.isTemp = isTemp;
    post.tags = tagList;
    post.user = user;
    post.updatedAt = new Date();

    return await post.save();
  }

  async delete(uuid: string, user: User) {
    const post: Post = await this.postRepository.findOneByUUID(uuid, false);

    if (!post) {
      throw new NotFoundException('Post not found.');
    }

    if (post.userIdx !== user.idx) {
      throw new ForbiddenException('No permission.');
    }

    post.user = user;

    await this.userService.handleScore(user.idx, DELETE_POST);

    return await post.remove();
  }

  async post(url: string): Promise<Post> {
    const post: Post = await this.postRepository.findOneWithUserByUrl(
      url,
      false,
    );

    if (!post) {
      throw new NotFoundException('Post not found.');
    }

    return post;
  }

  async posts(
    page: number,
    limit: number,
    postType: PostType,
  ): Promise<Post[]> {
    if (page < 1 || limit < 1) {
      throw new BadRequestException('Invalid page or limit.');
    }

    let posts: Post[] = [];

    switch (postType) {
      case PostType.CreatedAt:
        posts = await this.postRepository.findAllWithUserOrderByCreatedAtASC(
          page,
          limit,
          false,
        );
        break;
      case PostType.Like:
        posts = await this.postRepository.findAllWithUserOrderByLikeCountDESC(
          page,
          limit,
          false,
        );
        break;
    }

    return posts;
  }

  async tags(idx: number): Promise<Tag[]> {
    return await this.tagRepository.findAllByPostIdxOrderByIdxASC(idx);
  }

  async likeCount(idx: number): Promise<number> {
    return await this.likeRepository.findAllAndCountByPostIdx(idx);
  }

  async commentCount(idx: number): Promise<number> {
    return await this.getCommentCountByPostIdx(idx);
  }

  thumbnail(thumbnail: string): string {
    if (!thumbnail) {
      return null;
    }

    return generateURL(thumbnail);
  }

  async getCommentCountByPostIdx(postIdx: number): Promise<number> {
    const comments: Comment[] = await this.commentRepository.findAllByPostIdxOrderByCreatedAtASC(
      postIdx,
    );

    let commentCount: number = comments.length;

    // 비동기 작업 동시 실행.
    const promises: Promise<void>[] = [];

    for (const comment of comments) {
      const promise: Promise<void> = new Promise(async (resolve, reject) => {
        if (!comment) resolve();

        const replyCount: number = await this.replyRepository.findAllAndCount(
          comment.idx,
        );
        commentCount += replyCount;

        resolve();
      });

      promises.push(promise);
    }

    await Promise.all(promises);

    return commentCount;
  }

  async findOrCreateTagsAndGet(tags: PostTagInput[]): Promise<Tag[]> {
    let insertTags: Tag[] = [];

    if (tags && tags.length) {
      for (const tag of tags) {
        let insertTag: Tag = await this.tagRepository.findOneByName(tag.name);

        if (!insertTag) {
          insertTag = await this.tagRepository.create(tag).save();
        }

        insertTags = [...insertTags, insertTag];
      }
    }

    return insertTags;
  }
}
