import { Controller, Get, Post, Req, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { storage } from 'config/storage.config';
import { Express } from 'express';
import { PrismaService } from 'src/prisma/prisma.service';
// import { diskStorage } from 'multer';
import { UserService } from './user.service'

@Controller('user')
export class UserController {
    constructor(private userService: UserService, private prismaService: PrismaService) { }

    @Get('/')
    getUserInfo(@Req() req: any) {


        return this.userService.getUserInfo(req.user)
    }

    @Post('uploadProfile')
    @UseInterceptors(FileInterceptor('file', { storage }))
    async uploadProfile(@UploadedFile() file: Express.Multer.File, @Req() req: any) {

        const updateUser = await this.prismaService.user.update({
            where: {
                email: req.user.email,
            },
            data: {
                profileImg: file.path,
            },
        })



        return updateUser

    }


}
