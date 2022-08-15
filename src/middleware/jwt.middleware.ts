import { Injectable, NestMiddleware } from "@nestjs/common";
import { Request, Response, NextFunction } from 'express'
import { verify } from 'jsonwebtoken'

@Injectable()
export class JwtAuth implements NestMiddleware {

    async use(req: any, res: Response, next: NextFunction) {
        let token = req.headers['authorization']
        try {
            const decoded = await verify(token, "my super-secret key");
            console.log(decoded);

            req.user = decoded
            next();
        } catch (err) {
            res.status(404).json({
                msg: "invalid token"

            })

        }
    }
}