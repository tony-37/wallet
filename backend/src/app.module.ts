import { ProvidersModule } from '@lib/providers';
import { Module } from '@nestjs/common';
import { UserModule } from 'modules/user/user.module';

@Module({
  imports: [ProvidersModule, UserModule],
})
export class AppModule {}
