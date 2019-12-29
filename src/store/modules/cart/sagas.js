import { call, select, put, all, takeLatest } from 'redux-saga/effects';
import api from '../../../services/api';
import { formatPrice } from '../../../util/format';
import { addToCartSucess, updateAmount } from './actions';

// acessa a API e busca as informações detalhadas do produto e cadastrar no carrinho
function* addToCart({id}) {
  // verificar se o produto já existe no carrinho
  const productExists = yield select(
    state => state.cart.find(p => p.id === id),
  );

  // verificar se tem estoque suficiente para o pedido
  const stock = yield call(api.get, `/stock/${id}`);
  const stockAmount = stock.data.amount;
  // armazena a quantidade de pedidos
  const currentAmount = productExists ? productExists.amount : 0;

  const amount = currentAmount + 1;

  if (amount > stockAmount) {
    console.tron.warn('ERRO, sem estoque suficiente');
    return;
  }

  if (productExists) {
    yield put(updateAmount(id, amount));
  } else {
    const response = yield  call(api.get, `/products/${id}`);

    const data = {
      ...response.data,
      amount: 1,
      priceFormatted: formatPrice(response.data.price),
    };

    yield put(addToCartSucess(data));
  }


}

export default all([
  takeLatest('@cart/ADD_REQUEST', addToCart), // se o usuário clicar 2x, a primeira é desconsiderada, controlando o botão
]);
