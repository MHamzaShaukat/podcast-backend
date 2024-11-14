import { ObjectType, Field, InputType, Int } from '@nestjs/graphql';

@ObjectType()
class PodcastImagesDTO {
  @Field({ nullable: true }) 
  default: string;

  @Field({ nullable: true })
  featured: string;

  @Field({ nullable: true })
  thumbnail: string;

  @Field({ nullable: true })
  wide: string;
}

@ObjectType()
export class PodcastDTO {
  @Field()
  id: string;

  @Field()
  title: string;

  @Field(() => PodcastImagesDTO)
  images: PodcastImagesDTO;

  @Field()
  isExclusive: boolean;

  @Field()
  publisherName: string;

  @Field()
  publisherId: string;

  @Field()
  mediaType: string;

  @Field()
  description: string;

  @Field()
  categoryId: string;

  @Field()
  categoryName: string;

  @Field()
  hasFreeEpisodes: boolean;

  @Field()
  playSequence: string;
}

@InputType() 
export class PaginationDTO {
  @Field(() => Int, { nullable: true })
  page?: number;

  @Field(() => Int, { nullable: true })
  limit?: number;

  @Field({ nullable: true })
  search?: string;

  @Field({ nullable: true })
  title?: string;

  @Field({ nullable: true })
  categoryName?: string;
}

@ObjectType()
export class PodcastResponseDTO {
  @Field(() => [PodcastDTO])
  podcasts: PodcastDTO[];

  @Field(() => Number)
  totalCount: number;

  @Field(() => Int, { nullable: true })
  page?: number;

  @Field(() => Int, { nullable: true })
  limit?: number;
}