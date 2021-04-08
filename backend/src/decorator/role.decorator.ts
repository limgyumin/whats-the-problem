import { SetMetadata } from '@nestjs/common';
import { AllowedRole } from 'src/enum/role.enum';

export const Roles = (...roles: AllowedRole[]) => SetMetadata('roles', roles);
