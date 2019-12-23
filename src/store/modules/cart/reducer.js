/* Inicia o carrinho com state vazio para receber a action
    Importa o produto e faz com que o Redux atualize os atualiza os components
    que usam essa função , utiliza o immer para fazer flexibilização de estados */
import produce from 'immer';

export default function cart(state = [], action) {
  switch(action.type){
   case 'ADD_TO_CART':
    return produce(state, draft => {
      // regra para verificar se o produto não foi para o carrinho duplicado
      const productIndex = draft.findIndex(p => p.id === action.product.id);

      if (productIndex >= 0) {
        draft[productIndex].amount += 1;
      } else{
        draft.push({
          ...action.product,
          amount: 1,});
      }

    });
    case 'REMOVE_FROM_CART':
      return produce(state, draft => {
        const productIndex = draft.findIndex(p => p.id === action.id);

        // regra para remover o produto
        if (productIndex >= 0) {
          draft.splice(productIndex, 1);
        }

      })
   default:
     return state;
  }
}
