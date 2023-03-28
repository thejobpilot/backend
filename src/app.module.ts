import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { JwtStrategy } from './auth/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './users/user.module';
import { InvitationEmailModule } from './invitationEmail/invitationEmail.module';
import configuration from './config/configuration';
import { PositionModule } from './positions/position.module';
import { InterviewModule } from './interviews/interview.module';
import { QuestionModule } from './questions/question.module';
import { join } from 'path';
import { ResponseModule } from './responses/response.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    AuthModule,
    UserModule,
    InvitationEmailModule,
    PositionModule,
    InterviewModule,
    QuestionModule,
    ResponseModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: configuration().postgres.hostname,
      port: 5432,
      database: configuration().postgres.database,
      username: configuration().postgres.username,
      password: configuration().postgres.password,
      autoLoadEntities: true,
      entities: [join(__dirname, './**/*.entity{.ts,.js}')],
      //should be using migrations but whatever
      logging: true,
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService, JwtStrategy],
})
export class AppModule {}
