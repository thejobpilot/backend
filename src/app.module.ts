import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {ConfigModule} from '@nestjs/config';
import {AuthModule} from './auth/auth.module';
import {JwtStrategy} from './auth/jwt.strategy';
import {PassportModule} from '@nestjs/passport';
import {TypeOrmModule} from "@nestjs/typeorm";
import {UserModule} from "./users/user.module";
import configuration from "./config/configuration";

@Module({
    imports: [
        ConfigModule.forRoot(),
        AuthModule,
        UserModule,
        PassportModule.register({defaultStrategy: 'jwt'}),
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: configuration().postgres.hostname,
            port: 5432,
            database: configuration().postgres.database,
            username: configuration().postgres.username,
            password: configuration().postgres.password,
            autoLoadEntities: true,
            //should be using migrations but whatever
            synchronize: true,
            entities: ["src/entity/**/*.ts"],
            migrations: ["src/migration/**/*.ts"],
            subscribers: ["src/subscriber/**/*.ts"],
        }),
    ],
    controllers: [AppController],
    providers: [AppService, JwtStrategy],
})
export class AppModule {
}
