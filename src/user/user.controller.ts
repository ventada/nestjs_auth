import {
    Controller,
    Get,
    Post,
    Put,
    Req,
    UploadedFile,
    UseInterceptors,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { storage } from "config/storage.config";
import { Express } from "express";
import { PrintService } from "src/print/print.service";
import { PrismaService } from "src/prisma/prisma.service";
// import { diskStorage } from 'multer';
import { UserService } from "./user.service";

@Controller("user")
export class UserController {
    constructor(
        private userService: UserService,
        private prismaService: PrismaService,
        private print: PrintService
    ) { }

    @Get("/")
    getUserInfo(@Req() req: any) {
        this.print.print('hello from print module')
        return this.userService.getUserInfo(req.user);
    }

    @Put("uploadProfile")
    @UseInterceptors(FileInterceptor("file", { storage }))
    async uploadProfile(
        @UploadedFile() file: Express.Multer.File,
        @Req() req: any
    ) {
        return this.uploadProfile(req.user, file);
    }
}
