import { call, put, all, takeLatest } from 'redux-saga/effects';
import api from '../../../services/api';

import { addToCartSucess } from './actions';

// acessa a API e busca as informações detalhadas do produto e cadastrar no carrinho
function* addToCart({id}) {
  const response = yield  call(api.get, `/products/${id}`);

  yield put(addToCartSucess(response.data));
}

export default all([
  takeLatest('@cart/ADD_REQUEST', addToCart), // se o usuário clicar 2x, a primeira é desconsiderada, controlando o botão
]);
