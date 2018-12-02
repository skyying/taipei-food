export const isMatchKeyword = (item, keyword) => {
  let word = keyword.toLowerCase();
  return (
    item.name.toLowerCase().includes(word) ||
        matchCategories(item.categories, word)
  );
};

const matchCategories = (categories, keyword) => {
  return categories.some(
    (item, index) =>
      item.alias.toLowerCase().includes(keyword) ||
            item.title.toLowerCase().includes(keyword)
  );
};
