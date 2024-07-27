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
