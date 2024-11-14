import { Injectable, InternalServerErrorException, BadRequestException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { ConfigService } from '@nestjs/config';
import { PaginationDTO, PodcastResponseDTO } from './dto/podcast.dto';

@Injectable()
export class PodcastService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) { }

  async findAll(pagination: PaginationDTO): Promise<PodcastResponseDTO & { page: number; limit: number }> {
    const { page = 1, limit = 10, search, title, categoryName } = pagination;
    const params: any = { page, limit, search, title, categoryName };
    Object.keys(params).forEach((key) => (params[key] === undefined) && delete params[key]);

    const apiUrl = this.configService.get<string>('PODCAST_API_URL');

    try {
      const response = await firstValueFrom(this.httpService.get(apiUrl, { params }));
      const podcasts = response?.data;
      const totalCount = await this.getCount(search, title, categoryName, apiUrl);

      return { podcasts, totalCount, page, limit };

    } catch (error) {
      if (error.response) {
        throw new BadRequestException(`Failed to fetch podcasts: ${error.response.data?.message || 'Unknown error'}`);
      } else if (error.request) {
        throw new InternalServerErrorException('No response from the podcast API server.');
      } else {
        throw new InternalServerErrorException(`Error occurred: ${error.message}`);
      }
    }
  }

  private async getCount(search?: string, title?: string, categoryName?: string, apiUrl?: string): Promise<number> {
    const hasFilters = search || title || categoryName;
    try {
      if (hasFilters) {
        const filterParams = { search, title, categoryName };
        Object.keys(filterParams).forEach((key) => (filterParams[key] === undefined) && delete filterParams[key]);

        const countResponse = await firstValueFrom(this.httpService.get(apiUrl, { params: filterParams }));
        return countResponse?.data?.length || 0;
      } else {
        const countResponse = await firstValueFrom(this.httpService.get(apiUrl));
        return countResponse?.data?.length || 0;
      }
    } catch (error) {
      throw new InternalServerErrorException(`Failed to get podcast count: ${error.message}`);
    }
  }
}
