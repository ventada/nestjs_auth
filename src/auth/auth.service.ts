import { ForbiddenException, Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken'
import * as bcrypt from 'bcrypt'
import { PrismaClient } from '@prisma/client'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime'
import { PrismaService } from 'src/prisma/prisma.service';
const Prisma = new PrismaClient()


@Injectable()
export class AuthService {

    constructor(private prismaService: PrismaService) { }

    async signup(dto) {

        try {
            const saltOrRounds = 10;
            const password = 'random_password';
            const salt = await bcrypt.genSalt();
            const hash = await bcrypt.hash(dto.password, salt);

            const user = await this.prismaService.user.create({
                data: {
                    email: dto.email, hash, fullname: dto.fullname
                }


            })

            delete user.hash
            return user
        } catch (err) {
            if (err instanceof PrismaClientKnownRequestError)
                if (err.code == 'P2002') {
                    throw new ForbiddenException("invalid cridentials")
                }


        }
    }

    async signin(dto) {


        try {
            const user = await this.prismaService.user.findUnique({
                where: {
                    email: dto.email
                }
            })

            if (!user) throw new ForbiddenException("invalid cridentials")
            const isMActh = await bcrypt.compare(dto.password, user.hash)
            console.log(isMActh);

            if (!isMActh)
                throw new ForbiddenException("invalid cridentials")


            const payload = {
                id: user.id,
                email: user.email
            }

            let token = await jwt.sign(payload, "my super-secret key")

            return {
                msg: 'logged in succesfully',
                token
            }
        } catch (err) {
            console.log(err);
            return {
                msg: "anvalid input"
            }

        }
    }



}
