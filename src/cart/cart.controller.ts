import {
    Body,
    Controller,
    Get,
    HttpStatus,
    Param,
    Post,
    Put,
    Response,
} from '@nestjs/common';
import {
    INTERNAL_SERVER_ERROR,
    INVALID_INPUT,
} from 'src/common/constants/status-message.const';
import { CartService } from './cart.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import {
    ICheckout,
    ICreateCart,
    IGetOneCart,
    IUpdateCart,
} from './interfaces/cart.interface';

@Controller('cart')
export class CartController {
    constructor(private readonly cartService: CartService) {}

    @Post()
    async create(
        @Body() createCartDto: CreateCartDto,
        @Response() res,
    ): Promise<ICreateCart> {
        try {
            const createdCart = await this.cartService.create(createCartDto);

            if (!createdCart) {
                return res.status(HttpStatus.BAD_REQUEST).json({
                    success: false,
                    message: INVALID_INPUT,
                });
            }

            return res.status(HttpStatus.CREATED).json({
                success: true,
                createdCart,
            });
        } catch (error) {
            console.log(error);

            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                success: false,
                message: INTERNAL_SERVER_ERROR,
            });
        }
    }

    @Get(':id')
    async findOne(
        @Param('id') id: string,
        @Response() res,
    ): Promise<IGetOneCart> {
        try {
            const foundCart = await this.cartService.findOne(id);
            return res.status(HttpStatus.OK).json({
                success: true,
                foundCart,
            });
        } catch (error) {
            console.log(error);

            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                success: false,
                message: INTERNAL_SERVER_ERROR,
            });
        }
    }

    @Get('user/:id')
    async findCartByUserId(
        @Param('id') id: string,
        @Response() res,
    ): Promise<IGetOneCart> {
        try {
            const foundCart = await this.cartService.findByUserId(id);
            return res.status(HttpStatus.OK).json({
                success: true,
                foundCart,
            });
        } catch (error) {
            console.log(error);

            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                success: false,
                message: INTERNAL_SERVER_ERROR,
            });
        }
    }

    @Put(':id')
    async update(
        @Param('id') id: string,
        @Body() updateCartDto: UpdateCartDto,
        @Response() res,
    ): Promise<IUpdateCart> {
        try {
            const updatedCart = await this.cartService.update(
                id,
                updateCartDto,
            );
            return res.status(HttpStatus.OK).json({
                success: true,
                updatedCart,
            });
        } catch (error) {
            console.log(error);

            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                success: false,
                message: INTERNAL_SERVER_ERROR,
            });
        }
    }

    @Put('checkout/:id')
    async checkout(
        @Param('id') id: string,
        @Body() updateCartDto: UpdateCartDto,
        @Response() res,
    ): Promise<ICheckout> {
        try {
            await this.cartService.Checkout(id, updateCartDto);

            return res.status(HttpStatus.OK).json({
                success: true,
                message: 'Checkout successfuly',
            });
        } catch (error) {
            console.log(error);

            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                success: false,
                message: INTERNAL_SERVER_ERROR,
            });
        }
    }
}
