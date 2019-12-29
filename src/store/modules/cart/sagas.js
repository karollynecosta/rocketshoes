import { call, select, put, all, takeLatest } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import api from '../../../services/api';
import history from '../../../services/history';
import { formatPrice } from '../../../util/format';
import { addToCartSucess, updateAmountSucess, updateAmountRequest } from './actions';

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
    toast.error('Produto sem estoque suficiente');
    return;
  }

  if (productExists) {
    yield put(updateAmountSucess(id, amount));
  } else {
    const response = yield  call(api.get, `/products/${id}`);

    const data = {
      ...response.data,
      amount: 1,
      priceFormatted: formatPrice(response.data.price),
    };

    yield put(addToCartSucess(data));
    history.push('/cart');
  }


}

// aplica a verificação no estoque também no Carrinho
function* updateAmount({id, amount}) {
  if (amount <= 0) {
    return;
  }

  const stock = yield call(api.get, `stock/${id}`);
  const stockAmount = stock.data.amount;
  if (amount > stockAmount) {
    toast.error('Produto sem estoque suficiente');
    return;
  }

  yield put(updateAmountSucess(id, amount));
}

export default all([
  takeLatest('@cart/ADD_REQUEST', addToCart), // se o usuário clicar 2x, a primeira é desconsiderada, controlando o botão
  takeLatest('@cart/UPDATE_AMOUNT_REQUEST', updateAmount),
]);
