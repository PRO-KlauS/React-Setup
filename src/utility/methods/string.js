const capitalize = (s) => (s ? s[0].toUpperCase() + s.slice(1) : '');

const capitalizeSentence = (s) => {
  if (s) {
    let sentence = s.split(' ');
    sentence = sentence && sentence.map((se) => capitalize(se));
    return sentence && sentence.join(' ');
  } else {
    return '';
  }
};

const snakeCaseToTitleCase = (s) => {
  if (s) {
    let sentence = s.split('_');
    sentence = sentence && sentence.map((se) => capitalize(se));
    return sentence && sentence.join(' ');
  } else {
    return '';
  }
};

const getStringWithDays = (s) => {
  let modifiedString = Number(s) || '';
  if (modifiedString > 1) {
    modifiedString += ' days';
  } else if (modifiedString == 1) {
    modifiedString += ' day';
  } else {
    modifiedString = '-';
  }
  return modifiedString;
};

const getStringWithHours = (s) => {
  let modifiedString = Number(s) || '';
  if (modifiedString > 1) {
    modifiedString += ' hours';
  } else if (modifiedString == 1) {
    modifiedString += ' hour';
  } else {
    modifiedString = '-';
  }
  return modifiedString;
};

const removeAllSpacesFromString = (s) => (s ? s.replace(/ /g, '') : '');

export {
  capitalize,
  capitalizeSentence,
  snakeCaseToTitleCase,
  getStringWithDays,
  getStringWithHours,
  removeAllSpacesFromString,
};
