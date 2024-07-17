import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';

@Injectable()
export class AppService {

  // подключаем призмаСервис в любой необходимый нам сервис
  constructor(private readonly prismaService: PrismaService) {}

  // и в таком виде (this.prismaService) обращаемся к таблице в бд (image) и производим какое то действие над ней, подробнее в презентациях на портале
  // async getUserImages(userId: string) {
  //   const userImages = await this.prismaService.image.findMany({
  //     where: {
  //       userId: userId
  //     }
  //   }) 
  //   return userImages;
  // }

  getHello(): string {
    return 'Hello World!';
  }
}
