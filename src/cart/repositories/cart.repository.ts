import { Inject, Injectable } from '@nestjs/common';
import { IsNumberOptions } from 'class-validator';
import {
    CART_MODEL,
    CURRICULUM_MODEL,
    USER_MODEL,
} from 'src/database/database.constants';
import { CartModel } from 'src/database/model/cart.model';
import { CurriculumModel } from 'src/database/model/curriculum.model';
import { UserModel } from 'src/database/model/user.model';
import { CreateCartDto } from '../dto/create-cart.dto';
import { UpdateCartDto } from '../dto/update-cart.dto';

@Injectable()
export class CartRepository {
    constructor(
        @Inject(CART_MODEL) private cartModel: CartModel,
        @Inject(USER_MODEL) private userModel: UserModel,
        @Inject(CURRICULUM_MODEL) private curriculumModel: CurriculumModel,
    ) {}

    async createNewCurriculum(createCart: CreateCartDto) {
        const createdCart = await this.cartModel.create(createCart);
        return createdCart;
    }

    async checkUserId(userId: string) {
        const foundUser = await this.userModel.findById(userId);
        return foundUser ? Promise.resolve(true) : Promise.resolve(false);
    }

    async checkCurriculum(curriculums: string[]) {
        for (const curriculumId of curriculums) {
            let foundCurriculum = await this.curriculumModel.findById(
                curriculumId,
            );
            if (!foundCurriculum) return Promise.resolve(false);
        }
        return Promise.resolve(true);
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

    async findCurriculumnById(id: string) {
        return await this.curriculumModel.findById(id);
    }

    async updateQuanlityCurriculum(curriculums: string[]) {
        for (const curriculumId of curriculums) {
            let foundCurriculum = await this.findCurriculumnById(curriculumId);
            await this.curriculumModel.findOneAndUpdate(
                { _id: curriculumId },
                { quanlity: foundCurriculum.quanlity - 1 },
            );
        }
        return Promise.resolve(true);
    }
}
