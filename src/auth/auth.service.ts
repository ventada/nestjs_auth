import { ForbiddenException, Injectable } from "@nestjs/common";
import * as jwt from "jsonwebtoken";
import * as bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { PrismaService } from "src/prisma/prisma.service";
import { HelperService } from "src/helper/helper.service";
const Prisma = new PrismaClient();

@Injectable()
export class AuthService {
    constructor(private prismaService: PrismaService, private helper: HelperService) { }

    //do the logic behind the register
    // check for the arabic letter via the helperService
    //
    async signup(dto) {


        try {

            //return the fixed data
            // if balance is not a number return an error
            let data = this.helper.signupInputValidatin(dto)

            if (data.error) {
                return {
                    msg: data.error
                }
            }

            //hash the password
            const salt = await bcrypt.genSalt();
            const hash = await bcrypt.hash(data.password, salt);

            //register user in database
            //if email is allready taken, returns an errror
            // checked in schema
            const user = await this.prismaService.user.create({
                data: {
                    email: data.email,
                    hash,
                    fullname: data.fullname,
                    balance: data.balance
                },
            });

            delete user.hash;
            return user;
        } catch (err) {
            if (err instanceof PrismaClientKnownRequestError)
                if (err.code == "P2002") {
                    throw new ForbiddenException("invalid cridentials");
                }
        }
    }

    // loggin logic
    // check for email 


    async signin(dto) {
        try {
            const user = await this.prismaService.user.findUnique({
                where: {
                    email: dto.email,
                },
            });

            if (!user) throw new ForbiddenException("invalid cridentials");

            //check if password is currect
            const isMActh = await bcrypt.compare(dto.password, user.hash);
            console.log(isMActh);

            if (!isMActh) throw new ForbiddenException("invalid cridentials");


            //create a jwt token
            const payload = {
                id: user.id,
                email: user.email,
            };

            let token = await jwt.sign(payload, "my super-secret key");

            return {
                msg: "logged in succesfully",
                token,
            };
        } catch (err) {
            console.log(err);
            return {
                msg: "anvalid input",
            };
        }
    }
}
