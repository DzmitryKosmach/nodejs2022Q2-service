import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  ParseUUIDPipe,
  HttpCode,
} from '@nestjs/common';
import { StatusCodes } from 'http-status-codes';

import { ArtistsService } from './artists.service';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { CreateArtistDto } from './dto/create-artist.dto';

@Controller('artist')
export class ArtistsController {
  constructor(private readonly artistsService: ArtistsService) {}
  @Get()
  async findAll() {
    const users = await this.artistsService.findAll();
    return users;
  }

  @Get(':id')
  async findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    const artist = await this.artistsService.findOne(id);
    if (artist) return artist;
    throw new NotFoundException();
  }

  @Post()
  async create(@Body() userDto: CreateArtistDto) {
    const artist = await this.artistsService.create(userDto);
    return artist;
  }

  @Put(':id')
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateArtistDto: UpdateArtistDto,
  ) {
    const artist = await this.artistsService.update(id, updateArtistDto);
    if (artist) return artist;
    throw new NotFoundException();
  }

  @Delete(':id')
  @HttpCode(StatusCodes.NO_CONTENT)
  async remove(@Param('id', new ParseUUIDPipe()) id: string) {
    const isDeleted = await this.artistsService.remove(id);
    if (!isDeleted) {
      throw new NotFoundException();
    }
  }
}
