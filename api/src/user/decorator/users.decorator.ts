import { UseInterceptors } from '@nestjs/common';
import { CleanResponseUserInterceptor } from './users.interceptor';

export const CleanResponseUser = () => UseInterceptors(CleanResponseUserInterceptor);
