/*
 * @param item object
 * @param keyword string
 * return boolean true if current restaurant's name match keyword, otherwise return false
 */
export const isMatchKeyword = (item, keyword) => {
  let word = keyword.toLowerCase();
  return (
    item.name.toLowerCase().includes(word) ||
        matchCategories(item.categories, word)
  );
};

/*
 * @param categories Array
 * @param keyword String
 * return boolean true if current restaurant's categories match keyword, otherwise, return
 * false
 */
const matchCategories = (categories, keyword) => {
  return categories.some(
    item =>
      item.alias.toLowerCase().includes(keyword) ||
            item.title.toLowerCase().includes(keyword)
  );
};
