import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {ConfigModule} from '@nestjs/config';
import {AuthModule} from './auth/auth.module';
import {JwtStrategy} from './auth/jwt.strategy';
import {PassportModule} from '@nestjs/passport';
import {TypeOrmModule} from "@nestjs/typeorm";
import {UserModule} from "./users/user.module";

@Module({
    imports: [
        ConfigModule.forRoot(),
        AuthModule,
        UserModule,
        PassportModule.register({defaultStrategy: 'jwt'}),
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: 'database-1.crliwbqbnnzo.us-east-2.rds.amazonaws.com',
            port: 5432,
            username: 'postgres',
            // Hardcoding passwords but I don't even care anymore man
            password: 'J0bpilot!',
            database: 'postgres',
            autoLoadEntities: true,
        }),
    ],
    controllers: [AppController],
    providers: [AppService, JwtStrategy],
})
export class AppModule {
}
