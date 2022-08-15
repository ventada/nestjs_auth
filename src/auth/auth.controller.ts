import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }


    // @@@route /auth/signup
    // do the register stuff
    //
    @Post('signup')
    signup(@Body() dto: any) {
        return this.authService.signup(dto)
    }

    // @@@route /auth/signin
    // logg the usesr in using jwt, returns a token to client
    //
    @Post('signin')
    signin(@Body() dto: any) {
        return this.authService.signin(dto)
    }


}
