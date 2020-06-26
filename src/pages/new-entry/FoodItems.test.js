import React from 'react';
import { render } from '@testing-library/react';

import FoodItems from './FoodItems';
import { NUMBER_OF_FOOD_ITEMS_TO_CREATE_BY_DEFAULT } from './NewEntryPage.utils';

test('there are some empty inputs created by default', () => {
  const { getAllByLabelText } = render(<FoodItems />);

  expect(getAllByLabelText(/Продукт\/блюдо #\d+/)).toHaveLength(
    NUMBER_OF_FOOD_ITEMS_TO_CREATE_BY_DEFAULT
  );
});
