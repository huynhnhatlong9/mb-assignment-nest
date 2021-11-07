import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { DatabaseModule } from 'src/database/database.module';
import { CartRepository } from './repositories/cart.repository';

@Module({
    imports: [DatabaseModule],
    controllers: [CartController, CartRepository],
    providers: [CartService],
    exports: [CartService],
})
export class CartModule {}
