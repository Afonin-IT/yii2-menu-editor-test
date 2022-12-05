const sortByTreeIndex = (items) => {
  console.log('sortByTreeIndex', items);
  const itemsObj = items.reduce((acc, item) => {
    item.tree in acc ? acc[item.tree].push(item) : acc[item.tree] = [item];
    return acc;
  }, {});

  console.log('itemsObj', itemsObj)

  return [...Object.values(itemsObj)]
}

export default sortByTreeIndex;