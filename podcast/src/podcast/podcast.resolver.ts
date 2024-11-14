import { Resolver, Query, Args } from '@nestjs/graphql';
import { PodcastService } from './podcast.service';
import { PaginationDTO, PodcastResponseDTO } from './dto/podcast.dto';

@Resolver(() => PodcastResponseDTO)
export class PodcastResolver {
  constructor(private readonly podcastService: PodcastService) {}

  @Query(() => PodcastResponseDTO)
  async podcasts(@Args('pagination') pagination: PaginationDTO): Promise<PodcastResponseDTO> {
    return this.podcastService.findAll(pagination);
  }
}
