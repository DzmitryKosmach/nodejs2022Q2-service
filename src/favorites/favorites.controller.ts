import {
  Controller,
  Get,
  Param,
  Post,
  ParseUUIDPipe,
  NotFoundException,
  Delete,
  HttpCode,
  UnprocessableEntityException,
} from '@nestjs/common';
import { StatusCodes } from 'http-status-codes';
import { FavoritesService } from './favorites.service';

@Controller('favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}
  @Get()
  async findAll() {
    const users = await this.favoritesService.findAll();
    return users;
  }

  @Post('track/:id')
  async addTrack(@Param('id', new ParseUUIDPipe()) id: string) {
    const isAdded = await this.favoritesService.addTrack(id);
    if (!isAdded) {
      throw new UnprocessableEntityException();
    }
  }

  @Post('artist/:id')
  async addArtist(@Param('id', new ParseUUIDPipe()) id: string) {
    const isAdded = await this.favoritesService.addArtist(id);
    if (!isAdded) {
      throw new UnprocessableEntityException();
    }
  }

  @Post('album/:id')
  async addAlbum(@Param('id', new ParseUUIDPipe()) id: string) {
    const isAdded = await this.favoritesService.addAlbum(id);
    if (!isAdded) {
      throw new UnprocessableEntityException();
    }
  }

  @Delete('track/:id')
  @HttpCode(StatusCodes.NO_CONTENT)
  async removeTrack(@Param('id', new ParseUUIDPipe()) id: string) {
    const isDeleted = await this.favoritesService.deleteTrack(id);
    if (!isDeleted) {
      throw new NotFoundException();
    }
  }

  @Delete('album/:id')
  @HttpCode(StatusCodes.NO_CONTENT)
  async removeAlbum(@Param('id', new ParseUUIDPipe()) id: string) {
    const isDeleted = await this.favoritesService.deleteAlbum(id);
    if (!isDeleted) {
      throw new NotFoundException();
    }
  }

  @Delete('artist/:id')
  @HttpCode(StatusCodes.NO_CONTENT)
  async removeArtist(@Param('id', new ParseUUIDPipe()) id: string) {
    const isDeleted = await this.favoritesService.deleteArtist(id);
    if (!isDeleted) {
      throw new NotFoundException();
    }
  }
}
