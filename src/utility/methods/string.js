const capitalize = (s) => s && s[0].toUpperCase() + s.slice(1);

const titleCase = (s) => {
  let sentence = s && s.split('_');
  sentence = sentence && sentence.map((se) => capitalize(se));

  return sentence && sentence.join(' ');
};

const getStringWithDays = (s) => {
  let modifiedString = s || '-';
  if (modifiedString > 1) {
    modifiedString += ' days';
  } else if (modifiedString == 1) {
    modifiedString += ' day';
  }
  return modifiedString;
};

const getStringWithHours = (s) => {
  let modifiedString = s || '-';
  if (modifiedString > 1) {
    modifiedString += ' hours';
  } else if (modifiedString == 1) {
    modifiedString += ' hour';
  }
  return modifiedString;
};

const removeAllSpacesFromString = (s) => s && s.replace(/ /g, '');

export {
  capitalize,
  titleCase,
  getStringWithDays,
  getStringWithHours,
  removeAllSpacesFromString,
};
