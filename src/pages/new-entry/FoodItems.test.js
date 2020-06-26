import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import FoodItems from './FoodItems';
import { NUMBER_OF_FOOD_ITEMS_TO_CREATE_BY_DEFAULT } from './NewEntryPage.utils';

test('there are some empty inputs created by default', () => {
  const { getAllByLabelText } = render(<FoodItems />);

  expect(getAllByLabelText(/Продукт\/блюдо #\d+/)).toHaveLength(
    NUMBER_OF_FOOD_ITEMS_TO_CREATE_BY_DEFAULT
  );
});

test('new input can be created at an index by clicking +', () => {
  const { getByLabelText, getAllByLabelText } = render(<FoodItems />);

  userEvent.click(
    getByLabelText(
      `Добавить продукт/блюдо #${NUMBER_OF_FOOD_ITEMS_TO_CREATE_BY_DEFAULT + 1}`
    )
  );

  expect(getAllByLabelText(/Продукт\/блюдо #\d+/)).toHaveLength(
    NUMBER_OF_FOOD_ITEMS_TO_CREATE_BY_DEFAULT + 1
  );
});

test('an input can be deleted at an index', () => {
  const { getByLabelText, getAllByLabelText } = render(<FoodItems />);

  userEvent.click(
    getByLabelText(
      `Удалить продукт/блюдо #${NUMBER_OF_FOOD_ITEMS_TO_CREATE_BY_DEFAULT - 1}`
    )
  );

  expect(getAllByLabelText(/Продукт\/блюдо #\d+/)).toHaveLength(
    NUMBER_OF_FOOD_ITEMS_TO_CREATE_BY_DEFAULT - 1
  );
});

test('last input cannot be deleted', () => {
  const { getByLabelText, getAllByLabelText } = render(<FoodItems />);

  for (let i = NUMBER_OF_FOOD_ITEMS_TO_CREATE_BY_DEFAULT; i > 0; i--) {
    userEvent.click(getByLabelText(`Удалить продукт/блюдо #${i}`));
  }

  expect(getAllByLabelText(/Продукт\/блюдо #\d+/)).toHaveLength(1);
});
