import {
  capitalize,
  capitalizeSentence,
  snakeCaseToTitleCase,
  getStringWithDays,
  getStringWithHours,
  removeAllSpacesFromString,
} from '../../utility';

test('Testing capitalize fn', () => {
  const capitalizedString1 = capitalize('test');
  const capitalizedString2 = capitalize('testing capitalize fn');
  const capitalizedString3 = capitalize(undefined);

  expect(capitalizedString1).toMatch('Test');
  expect(capitalizedString2).toMatch('Testing capitalize fn');
  expect(capitalizedString3).toMatch('');
});

test('Testing capitalizeSentence fn', () => {
  const capitalizedSentence1 = capitalizeSentence(
    'testing the capitalizeSentence function',
  );
  const capitalizedSentence2 = capitalizeSentence(
    ' testing the capitalizeSentence function ',
  );
  const capitalizedSentence3 = capitalizeSentence(undefined);

  expect(capitalizedSentence1).toMatch(
    'Testing The CapitalizeSentence Function',
  );
  expect(capitalizedSentence2).toMatch(
    ' Testing The CapitalizeSentence Function ',
  );
  expect(capitalizedSentence3).toMatch('');
});

test('Testing snakeCaseToTitleCase fn', () => {
  const titleCasedString1 = snakeCaseToTitleCase(
    'testing_snakeCaseToTitleCase_function',
  );
  const titleCasedString2 = snakeCaseToTitleCase(undefined);

  expect(titleCasedString1).toMatch('Testing SnakeCaseToTitleCase Function');
  expect(titleCasedString2).toMatch('');
});

test('Testing getStringWithDays fn', () => {
  const daysString1 = getStringWithDays(1);
  const daysString2 = getStringWithDays('1');
  const daysString3 = getStringWithDays(2);
  const daysString4 = getStringWithDays('2');
  const daysString5 = getStringWithDays('0');
  const daysString6 = getStringWithDays(0);
  const daysString7 = getStringWithDays(-1);
  const daysString8 = getStringWithDays('-1');
  const daysString9 = getStringWithDays(undefined);

  expect(daysString1).toMatch('1 day');
  expect(daysString2).toMatch('1 day');
  expect(daysString3).toMatch('2 days');
  expect(daysString4).toMatch('2 days');
  expect(daysString5).toMatch('-');
  expect(daysString6).toMatch('-');
  expect(daysString7).toMatch('-');
  expect(daysString8).toMatch('-');
  expect(daysString9).toMatch('-');
});

test('Testing getStringWithHours fn', () => {
  const hoursString1 = getStringWithHours(1);
  const hoursString2 = getStringWithHours('1');
  const hoursString3 = getStringWithHours(2);
  const hoursString4 = getStringWithHours('2');
  const hoursString5 = getStringWithHours('0');
  const hoursString6 = getStringWithHours(0);
  const hoursString7 = getStringWithHours(-1);
  const hoursString8 = getStringWithHours('-1');
  const hoursString9 = getStringWithHours(undefined);

  expect(hoursString1).toMatch('1 hour');
  expect(hoursString2).toMatch('1 hour');
  expect(hoursString3).toMatch('2 hours');
  expect(hoursString4).toMatch('2 hours');
  expect(hoursString5).toMatch('-');
  expect(hoursString6).toMatch('-');
  expect(hoursString7).toMatch('-');
  expect(hoursString8).toMatch('-');
  expect(hoursString9).toMatch('-');
});

test('Testing removeAllSpacesFromString fn', () => {
  const spacelessString1 = removeAllSpacesFromString(' test ');
  const spacelessString2 = removeAllSpacesFromString(
    ' testing removeAllSpacesFromString fn ',
  );
  const spacelessString3 = removeAllSpacesFromString(undefined);

  expect(spacelessString1).toMatch('test');
  expect(spacelessString2).toMatch('testingremoveAllSpacesFromStringfn');
  expect(spacelessString3).toMatch('');
});
