import { Injectable } from '@nestjs/common';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { CartRepository } from './repositories/cart.repository';

@Injectable()
export class CartService {
    constructor(private cartRepository: CartRepository) {}

    async create(createCartDto: CreateCartDto) {
        return await this.cartRepository.createNewCurriculum(createCartDto);
    }

    async findOne(id: string) {
        return await this.cartRepository.getCartById(id);
    }

    async update(id: string, updateCartDto: UpdateCartDto) {
        const updateCartCondition = { _id: id };
        return await this.cartRepository.updateCart(
            updateCartCondition,
            updateCartDto,
        );
    }
}
