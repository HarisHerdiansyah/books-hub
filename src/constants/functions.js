export function keywordBuilder(fields) {
  const splitField = [
    ...fields.username.toLowerCase().split(' '),
    ...fields.title.toLowerCase().split(' '),
    ...fields.writer.toLowerCase().split(' ')
  ];

  const keywords = [];
  splitField.forEach((field) => {
    let key = '';
    field.split('').forEach((f) => {
      key += f;
      keywords.push(key);
    });
  });

  return keywords;
}

export function logError(action, error) {
  if (import.meta.env.MODE === 'development') {
    // eslint-disable-next-line no-console
    console.error(`Error ${action.toUpperCase()}`, error?.code, error?.message);
  }
}
