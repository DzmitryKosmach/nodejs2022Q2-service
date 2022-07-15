import {
  //Body,
  Controller,
  //Delete,
  Get,
  //NotFoundException,
  Param,
  Post,
  //Put,
  ParseUUIDPipe,
} from '@nestjs/common';
//import { FavoritesEntity } from './entities/favorites.entity';
import { FavoritesService } from './favorites.service';
//import { UpdateFavoritesDto } from './dto/update-favorites.dto';
//import { CreateFavoritesDto } from './dto/create-favorites.dto';

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
    await this.favoritesService.addTrack(id);
    //return favorites;
  }
}
