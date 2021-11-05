import { SetMetadata } from '@nestjs/common';
import { METADATA } from 'src/common/constants/api-metadata.const';

export const Public = () => {
    return SetMetadata(METADATA.IS_PUBLIC, true);
};
