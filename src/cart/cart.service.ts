import { Injectable } from '@nestjs/common';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { CartRepository } from './repositories/cart.repository';

@Injectable()
export class CartService {
    constructor(private cartRepository: CartRepository) {}

    async create(createCartDto: CreateCartDto) {
        if (!(await this.cartRepository.checkUserId(createCartDto.userId)))
            return Promise.resolve(false);
        return await this.cartRepository.createNewCurriculum(createCartDto);
    }

    async findOne(id: string) {
        return await this.cartRepository.getCartById(id);
    }

    async findByUserId(userId: string) {
        return await this.cartRepository.getCartByUserId(userId);
    }

    async update(id: string, updateCartDto: UpdateCartDto) {
        const updateCartCondition = { _id: id };

        if (
            !(await this.cartRepository.checkCurriculum(
                updateCartDto.curriculums,
            ))
        )
            return Promise.resolve(false);

        return await this.cartRepository.updateCart(
            updateCartCondition,
            updateCartDto,
        );
    }

    async Checkout(id: string, updateCartDto: UpdateCartDto) {
        const updateCartCondition = { _id: id };

        await this.cartRepository.updateQuanlityCurriculum(
            updateCartDto.curriculums,
        );

        await this.cartRepository.updateCart(updateCartCondition, {
            ...updateCartDto,
            curriculums: [],
        });

        return Promise.resolve(true);
    }
}
