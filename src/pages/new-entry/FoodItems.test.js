import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import FoodItems from './FoodItems';
import { NUMBER_OF_FOOD_ITEMS_TO_CREATE_BY_DEFAULT } from './NewEntryPage.utils';

const getInputByIndex = getByLabelText => index => {
  return getByLabelText(`Продукт/блюдо #${index + 1}`);
};

const getAllInputs = getAllByLabelText => {
  return getAllByLabelText(/Продукт\/блюдо #\d+/);
};

const getAddButton = getByLabelText => getByLabelText('Добавить продукт/блюдо');

const getRemoveButtonByIndex = getByLabelText => index => {
  return getByLabelText(`Удалить продукт/блюдо #${index + 1}`);
};

test('there are some empty inputs created by default', () => {
  const { getAllByLabelText } = render(<FoodItems />);

  expect(getAllInputs(getAllByLabelText)).toHaveLength(
    NUMBER_OF_FOOD_ITEMS_TO_CREATE_BY_DEFAULT
  );
});

test('new input can be created by clicking +', () => {
  const { getByLabelText, getAllByLabelText } = render(<FoodItems />);

  userEvent.click(getAddButton(getByLabelText));

  expect(getAllInputs(getAllByLabelText)).toHaveLength(
    NUMBER_OF_FOOD_ITEMS_TO_CREATE_BY_DEFAULT + 1
  );
});

test('an input can be deleted at an index', () => {
  const { getByLabelText, getAllByLabelText } = render(<FoodItems />);

  userEvent.click(
    getRemoveButtonByIndex(getByLabelText)(
      NUMBER_OF_FOOD_ITEMS_TO_CREATE_BY_DEFAULT - 1
    )
  );

  expect(getAllInputs(getAllByLabelText)).toHaveLength(
    NUMBER_OF_FOOD_ITEMS_TO_CREATE_BY_DEFAULT - 1
  );
});

test('last input cannot be deleted', () => {
  const { getByLabelText, getAllByLabelText } = render(<FoodItems />);

  for (let i = NUMBER_OF_FOOD_ITEMS_TO_CREATE_BY_DEFAULT - 1; i >= 0; i--) {
    userEvent.click(getRemoveButtonByIndex(getByLabelText)(i));
  }

  expect(getAllInputs(getAllByLabelText)).toHaveLength(1);
});

test('value can be entered into input', async () => {
  const { getByLabelText } = render(<FoodItems />);

  await userEvent.type(getInputByIndex(getByLabelText)(0), 'соевый капучино');
  expect(getInputByIndex(getByLabelText)(0)).toHaveAttribute(
    'value',
    'соевый капучино'
  );
});
