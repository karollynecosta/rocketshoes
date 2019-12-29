/* Inicia o carrinho com state vazio para receber a action
    Importa o produto e faz com que o Redux atualize os atualiza os components
    que usam essa função , utiliza o immer para fazer flexibilização de estados */
import produce from 'immer';

export default function cart(state = [], action) {
  switch(action.type){
   case '@cart/ADD_SUCESS':
    return produce(state, draft => {
     const { product } = action;

     draft.push(product);

    });
    case '@cart/REMOVE':
      return produce(state, draft => {
        const productIndex = draft.findIndex(p => p.id === action.id);

        // regra para remover o produto
        if (productIndex >= 0) {
          draft.splice(productIndex, 1);
        }

      });

    case '@cart/UPDATE_AMOUNT':
      return produce(state, draft => {
        if (action.amount <= 0) {
          return state;
        }

        const productIndex = draft.findIndex(p => p.id === action.id);

        if (productIndex >= 0) {
          draft[productIndex].amount = Number(action.amount);
        }

      });

   default:
     return state;
  }
}
