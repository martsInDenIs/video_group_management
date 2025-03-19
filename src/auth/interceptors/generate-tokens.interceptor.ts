import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';
import { JwtService } from '../services';

@Injectable()
export class GenerateTokensInterceptor implements NestInterceptor {
  constructor(private readonly jwtService: JwtService) {}

  intercept(_: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        return this.jwtService.generateTokens(data);
      }),
    );
  }
}
