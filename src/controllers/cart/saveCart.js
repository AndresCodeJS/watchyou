import { ProductCart } from "../../models/ProductCart.js";
import { Cart } from "../../models/Cart.js";

export const saveCart = async (req, res) => {
  const { currentCart } = req.body;
  const { itemsQuantity, total, products } = currentCart;

  try {

    let cart  = await Cart.findByPk(currentCart.id);

    //Si existe borra todos los productos asociados a ese carro y luego modifica el carro con save
    if(cart){
      await ProductCart.destroy({
        where: {
          cartId: cart.id,
        },
      });

      cart.itemsQuantity = itemsQuantity
      cart.total = total
      await cart.save()

    }else{  //Si no existe crea el carro

       cart = await Cart.create(
      {
        itemsQuantity,
        total,
      },
      {
        fields: ["itemsQuantity", "total"],
      }
    );

    }

    //actualiza los productos asociados al carro
    let cartProducts = products.map((item) => {
      return {
        productQuantity: item.quantity,
        cartId: cart.id,
        productId: item.id,
      };
    });

    await ProductCart.bulkCreate(cartProducts);

    res.status(200).json({ id: cart.id });
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ error: true, message: "Error inesperado, ver logs" });
  }
};
