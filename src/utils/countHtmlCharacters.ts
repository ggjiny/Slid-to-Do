const countHtmlCharacters = (htmlString: string) => {
  let content = htmlString.replace(/<p>|<\/p>/g, '\n');

  content = content.replace(/<[^>]+>/g, '');

  content = content.replace(/\n$/, '');

  const withSpaces = content.length;
  const withoutSpaces = content.replace(/\s/g, '').length;

  return { withSpaces, withoutSpaces };
};

export default countHtmlCharacters;
