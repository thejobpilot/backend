import {Injectable, Logger} from '@nestjs/common';
import {PassportStrategy} from '@nestjs/passport';
import {ExtractJwt, Strategy} from 'passport-jwt';
import {passportJwtSecret} from 'jwks-rsa';
import {config} from '../config/configuration';
import e from 'express';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            secretOrKeyProvider: passportJwtSecret({
                cache: true,
                rateLimit: true,
                jwksRequestsPerMinute: 5,
                jwksUri: `${config().auth0.issuer_url}.well-known/jwks.json`,
            }),
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            audience: config().auth0.audience,
            issuer: `${config().auth0.issuer_url}`,
            algorithms: ['RS256'],
        });
    }

    validate(payload: unknown): unknown {
        Logger.log('AYO');
        return payload;
    }

    authenticate(req: e.Request, options?: any) {
        Logger.log(req);
        super.authenticate(req, options);
    }

    success(user: any, info?: any) {
        super.success(user, info);
    }

    error(err: Error) {
        Logger.log('error');
        super.error(err);
    }

    redirect(url: string, status?: number) {
        Logger.log('redirect');

        super.redirect(url, status);
    }

    fail(challenge: any, status: number): void;
    // overload signature for fail method that takes only a status parameter
    fail(status: number): void;
    // implementation of the fail method
    fail(challengeOrStatus: any, status?: number): void {
        console.log(challengeOrStatus)
        if (typeof status === 'undefined') {
            super.fail(challengeOrStatus);
        } else {
            super.fail(challengeOrStatus, status);
        }
    }
}
