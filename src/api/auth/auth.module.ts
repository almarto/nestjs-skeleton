import { Module } from '@nestjs/common';

import { UserModule } from 'src/api/user';

import { AuthService } from './auth.service';
import { HttpStrategy } from './http.strategy';
import { AppAuthGuard } from './AppAuthGuard';
import { CookieSerializer } from './cookie-serializer';

@Module({
  imports: [UserModule],
  providers: [AuthService, HttpStrategy, AppAuthGuard, CookieSerializer],
})
export class AuthModule {}
