/* Inicia o carrinho com state vazio para receber a action

    Importa o produto e faz com que o Redux atualize os atualiza os components
    que usam essa função   */

export default function cart(state = [], action) {
  switch(action.type){
   case 'ADD_TO_CART':
     return[...state, action.product];
   default:
     return state;
  }
}
