import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
// import { JwtAuth } from './middleware/jwt.middleware'
import { AuthModule } from './auth/auth.module';
import { JwtAuth } from './middleware/jwt.middleware';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';

import { HelperModule } from './helper/helper.module';


@Module({
  imports: [AuthModule, PrismaModule, UserModule, HelperModule],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {

  //use a middleware for authentication
  // 
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(JwtAuth)
      .forRoutes('user')
  }
}
