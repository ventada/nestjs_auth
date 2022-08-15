import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client'
import { PrismaService } from 'src/prisma/prisma.service';
const prisma = new PrismaClient()
@Injectable()
export class UserService {
    constructor(private prismaService: PrismaService) { }
    async getUserInfo(user) {

        let currentUser = await this.prismaService.user.findUnique(
            {
                where: {
                    email: user.email
                }
            }
        )
        delete currentUser.hash
        return currentUser

    }

    async uploadProfilePhoto(user, file) {
        const updateUser = await this.prismaService.user.update({
            where: {
                email: user.email,
            },
            data: {
                profileImg: file.path,
            },
        })

    }
}
