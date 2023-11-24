import { ProvidersModule } from '@lib/providers';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from 'modules/user/user.module';
import typeorm from '@lib/providers/typeorm/typeorm.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [typeorm],
    }),
    ProvidersModule,
    UserModule,
  ],
})
export class AppModule {}
