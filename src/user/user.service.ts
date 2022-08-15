import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
@Injectable()
export class UserService {

    async getUserInfo(user) {

        return user

    }
}
