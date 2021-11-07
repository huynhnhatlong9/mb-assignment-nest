import { Inject, Injectable } from '@nestjs/common';
import { IsNumberOptions } from 'class-validator';
import { CART_MODEL } from 'src/database/database.constants';
import { CartModel } from 'src/database/model/cart.model';
import { CreateCartDto } from '../dto/create-cart.dto';
import { UpdateCartDto } from '../dto/update-cart.dto';

@Injectable()
export class CurriculumRepository {
    constructor(@Inject(CART_MODEL) private cartModel: CartModel) {}

    async createNewCurriculum(createCart: CreateCartDto) {
        const createdCart = await this.cartModel.create(createCart);
        return createdCart;
    }

    async getCartById(id: string) {
        return await this.cartModel.findById(id);
    }

    async updateCart(cartUpdateCondition, updatedCart) {
        const cart = await this.cartModel.findOneAndUpdate(
            cartUpdateCondition,
            updatedCart,
            { new: true, useFindAndModify: false },
        );
        return cart;
    }
}
