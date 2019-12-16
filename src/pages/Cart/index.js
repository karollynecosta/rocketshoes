import React from 'react';
import {MdRemoveCircleOutline, MdAddCircleOutline, MdDelete} from 'react-icons/md';

import { Container, ProductTable, Total } from './styles';

export default function Cart() {
  return (
    <Container>
      <ProductTable>
        <thead>
          <tr>
            <th />
            <th>PRODUTO</th>
            <th>QTD</th>
            <th>SUBTOTAL</th>
            <th />
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
            <img
            src="https://static.netshoes.com.br/produtos/tenis-nike-precision-iii/72/HZM-1284-172/HZM-1284-172_detalhe1.jpg?ims=326x"
            alt="Tenis"
            />
            </td>
            <td>
              <strong>Tenis massa</strong>
              <span>R$150,00</span>
            </td>
            <div>
            <td>
              <button type='button'>
                <MdRemoveCircleOutline size={20} color="#7159c1" />
              </button>
              <input type="number" readOnly value={2} />
              <button type='button'>
                <MdAddCircleOutline size={20} color="#7159c1" />
              </button>
            </td>
            </div>
            <td>
              <strong>R$300,00</strong>
            </td>
            <td>
              <button type="button">
                <MdDelete size={20} color="#7159c1" />
              </button>
            </td>
          </tr>
        </tbody>

      </ProductTable>

      <footer>
        <button type="button">Finalizar pedido</button>

        <Total>
          <span>TOTAL</span>
          <strong>R$150,00</strong>
        </Total>
      </footer>
    </Container>
  );
}
