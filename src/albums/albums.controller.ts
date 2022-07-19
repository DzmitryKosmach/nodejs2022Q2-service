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
import { AlbumsService } from './albums.service';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { CreateAlbumDto } from './dto/create-album.dto';
import { StatusCodes } from 'http-status-codes';

@Controller('album')
export class AlbumsController {
  constructor(private readonly albumsService: AlbumsService) {}
  @Get()
  async findAll() {
    const users = await this.albumsService.findAll();
    return users;
  }

  @Get(':id')
  async findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    const album = await this.albumsService.findOne(id);
    if (album) return album;
    throw new NotFoundException();
  }

  @Post()
  async create(@Body() userDto: CreateAlbumDto) {
    const album = await this.albumsService.create(userDto);
    return album;
  }

  @Put(':id')
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() dto: UpdateAlbumDto,
  ) {
    const album = await this.albumsService.update(id, dto);
    if (album) return album;
    throw new NotFoundException();
  }

  @Delete(':id')
  @HttpCode(StatusCodes.NO_CONTENT)
  async remove(@Param('id', new ParseUUIDPipe()) id: string) {
    const isDeleted = await this.albumsService.remove(id);
    if (!isDeleted) {
      throw new NotFoundException();
    }
  }
}
