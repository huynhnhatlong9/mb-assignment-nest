import { RolesType } from '../../shared/roles-type.enum';
import { SetMetadata } from '@nestjs/common';
import { HAS_ROLE } from '../auth.constants';

export const HasRole = (roles: RolesType[]) => SetMetadata(HAS_ROLE, roles);
