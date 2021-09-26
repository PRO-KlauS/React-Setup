import {
  formatDate,
  formatTime,
  formatDateAndTime,
  formatDateBySpecifiedFormat,
  fromNow,
  toNow,
  // timeTo,
} from '../../utility';

test('Testing formatDate fn', () => {
  const formattedDate1 = formatDate('Fri, 01 Feb 2021 03:04:05 GMT');
  const formattedDate2 = formatDate(undefined);

  expect(formattedDate1).toMatch('01/02/2021');
  expect(formattedDate2).toMatch('');
});

test('Testing formatTime fn', () => {
  const formattedDate1 = formatTime('Fri, 01 Feb 2021 03:04:05 GMT');
  const formattedDate2 = formatTime(undefined);

  expect(formattedDate1).toMatch('08:34 AM');
  expect(formattedDate2).toMatch('');
});

test('Testing formatDateAndTime fn', () => {
  const formattedDate1 = formatDateAndTime('Fri, 01 Feb 2021 03:04:05 GMT');
  const formattedDate2 = formatDateAndTime(undefined);

  expect(formattedDate1).toMatch('01/02/2021 08:34 AM');
  expect(formattedDate2).toMatch('');
});

test('Testing formatDateBySpecifiedFormat fn', () => {
  const formattedDate1 = formatDateBySpecifiedFormat(
    'Fri, 01 Feb 2021 03:04:05 GMT',
    'DD-MM-YYYY',
  );
  const formattedDate2 = formatDateBySpecifiedFormat(undefined);

  expect(formattedDate1).toMatch('01-02-2021');
  expect(formattedDate2).toMatch('');
});

test('Testing fromNow fn', () => {
  const testDate = new Date();
  const day = testDate.getDate();
  if (day > 1) {
    testDate.setDate(day - 1);
  } else {
    testDate.setDate(day + 1);
  }
  const formattedDate1 = fromNow(testDate);
  const formattedDate2 = fromNow(undefined);

  expect(formattedDate1).toMatch(day > 1 ? 'a day ago' : 'in a day');
  expect(formattedDate2).toMatch('');
});

test('Testing toNow fn', () => {
  const testDate = new Date();
  const day = testDate.getDate();
  if (day > 1) {
    testDate.setDate(day - 1);
  } else {
    testDate.setDate(day + 1);
  }
  const formattedDate1 = toNow(testDate);
  const formattedDate2 = toNow(undefined);

  expect(formattedDate1).toMatch(day > 1 ? 'in a day' : 'a day ago');
  expect(formattedDate2).toMatch('');
});

// test('Testing timeTo fn', () => {
//   let testDate = new Date();
//   let day = testDate.getDate();
//   testDate.setDate(day + 1)

//   const formattedDate1 = timeTo(testDate)
//   expect(formattedDate1).toMatch("24 hours 0 minutes"); // This may fail sometimes because of the difference created due to the execution time

//   const formattedDate2 = timeTo(undefined)
//   expect(formattedDate2).toMatch("-");
// });
