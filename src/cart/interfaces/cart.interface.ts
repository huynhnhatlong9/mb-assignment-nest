import { Cart } from 'src/database/model/cart.model';

export interface ICreateCart {
    success: Boolean;
    createdCurriculum?: Cart;
    message?: String;
}

export interface IGetOneCart {
    success: Boolean;
    foundCart?: Cart;
    message?: String;
}

export interface IUpdateCart {
    success: Boolean;
    updatedCart?: Cart;
    message?: String;
}
