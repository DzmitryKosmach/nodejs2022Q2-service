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
  UseGuards,
} from '@nestjs/common';
import { TracksService } from './tracks.service';
import { UpdateTrackDto } from './dto/update-track.dto';
import { CreateTrackDto } from './dto/create-track.dto';
import { StatusCodes } from 'http-status-codes';
import { JwtAuthGuard } from 'src/auth/auth.guard';

@Controller('track')
export class TracksController {
  constructor(private readonly tracksService: TracksService) {}
  @Get()
  async findAll() {
    const users = await this.tracksService.findAll();
    return users;
  }

  @Get(':id')
  async findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    const artist = await this.tracksService.findOne(id);
    if (artist) return artist;
    throw new NotFoundException();
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Body() userDto: CreateTrackDto) {
    const artist = await this.tracksService.create(userDto);
    return artist;
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updatePasswordDto: UpdateTrackDto,
  ) {
    const artist = await this.tracksService.update(id, updatePasswordDto);
    if (artist) return artist;
    throw new NotFoundException();
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @HttpCode(StatusCodes.NO_CONTENT)
  async remove(@Param('id', new ParseUUIDPipe()) id: string) {
    const isDeleted = await this.tracksService.remove(id);
    if (!isDeleted) {
      throw new NotFoundException();
    }
  }
}
