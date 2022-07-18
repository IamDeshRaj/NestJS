import { CallHandler, ExecutionContext, Injectable, NestInterceptor, UseInterceptors } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { map, Observable } from 'rxjs';

interface ClassConstructor {
  new(...ars: any[]): {}
}

export function CustomSerializer(classTyep: ClassConstructor) {
  return UseInterceptors(new CustomSerializerInterceptor(classTyep));
}

@Injectable()
export class CustomSerializerInterceptor implements NestInterceptor {

  constructor(private classType: ClassConstructor) { }

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(map((data: any) => {
      return plainToInstance(this.classType, data, {
        excludeExtraneousValues: true
      });
    }));
  }
}
