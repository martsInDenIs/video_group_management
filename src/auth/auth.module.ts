import { Module } from '@nestjs/common';
import { JwtService } from './services';
import { GenerateTokensInterceptor } from './interceptors';
import { JwtModule } from '@nestjs/jwt';
import { AuthGuard, RolesGuard } from './guards';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [JwtModule.register({})],
  controllers: [],
  providers: [
    JwtService,
    GenerateTokensInterceptor,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    RolesGuard,
  ],
  exports: [JwtService, GenerateTokensInterceptor, RolesGuard],
})
export class AuthModule {}
