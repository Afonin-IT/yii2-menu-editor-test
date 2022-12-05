const createTreeFromNestedSet = arr => {
  if (arr.length > 0) {
    return [...arr].sort((a, b) => a.lft - b.lft).reduce((tree, n) => {
      let curr = null;
      let next = tree;

      while (next) {
        curr = next;
        next = curr.children.find(c => c.lft < n.lft && c.rgt > n.rgt);
      }

      curr.children.push({ ...n, children: [] });

      curr.children = curr.children.sort((a, b) => a.position - b.position);

      console.log(curr.children)

      return tree;
    }, { children: [] }).children[0];
  } else {
    return [];
  }
}

export default createTreeFromNestedSet;