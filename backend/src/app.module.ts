import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import dbConfig from './database/db.config';
import { ConfigModule } from '@nestjs/config';
import { ApolloDriverConfig, ApolloDriver } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { UsersModule } from './modules/users/users.module';
import { SocketModule } from './modules/socket/socket.module';
import { RoomsModule } from './modules/rooms/rooms.module';
import { MessageModule } from './modules/message/message.module';
import { AuthModule } from './auth/auth.module';
@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      autoSchemaFile: './schema.gql',
      driver: ApolloDriver,
      playground: true,
      context: ({ req }) => ({ headers: req?.headers }),
    }),
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
      load: [dbConfig],
    }),
    AuthModule,
    DatabaseModule,
    UsersModule,
    SocketModule,
    RoomsModule,
    MessageModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
