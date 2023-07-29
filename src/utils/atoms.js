const { atom } = require("jotai");

export const validPromoCode = atom(false);
export const itemsPurchased = atom(0);
export const totalPrice = atom(0);
export const user = atom();
export const users = atom();
export const shoppingCart = atom([]);
export const checkOutProcess = atom("pending");
