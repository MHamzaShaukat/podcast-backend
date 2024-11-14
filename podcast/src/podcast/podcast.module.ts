import { Module } from '@nestjs/common';
import { PodcastResolver } from './podcast.resolver';
import { PodcastService } from './podcast.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  providers: [PodcastResolver, PodcastService],
})
export class PodcastModule {}
