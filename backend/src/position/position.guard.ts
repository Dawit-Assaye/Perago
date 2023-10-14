import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';


@Injectable()
export class PositionGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const { parent_id,report_to } = request.body;

    if (!parent_id || !report_to) {
      return false;
    }

    return true;
  }
}