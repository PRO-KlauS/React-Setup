import { statusToColorMapper, sortingMethodIconMapper } from '../../utility';

test('Testing statusToColorMapper', () => {
  const color1 = statusToColorMapper.success;
  const color2 = statusToColorMapper.failure;
  const color3 = statusToColorMapper.in_progress;

  expect(color1).toMatch('green');
  expect(color2).toMatch('red');
  expect(color3).toMatch('yellow');
});

test('Testing sortingMethodIconMapper', () => {
  const icon1 = sortingMethodIconMapper.both;
  const icon2 = sortingMethodIconMapper.ASC;
  const icon3 = sortingMethodIconMapper.DESC;

  expect(icon1).toMatch('fas fa-sort');
  expect(icon2).toMatch('fas fa-sort-up');
  expect(icon3).toMatch('fas fa-sort-down');
});
