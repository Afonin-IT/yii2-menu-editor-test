import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {fetchMenu, menuSelector, updateMenuItem} from "../../store/menu";
import createTreeFromNestedSet from "../../helpers/createTreeFromNestedSet";
import {ReactSortable} from "react-sortablejs";
import sortableConfig from "../../config/sortableConfig";
import MenuItemStack from "../MenuItemStack";
import styles from './styles.module.scss'

const MenuList = () => {
  const dispatch = useDispatch();
  const {isLoading, items} = useSelector(menuSelector);
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    dispatch(fetchMenu())
  }, []);

  useEffect(() => {
    const itemTrees = items.map(item => createTreeFromNestedSet(item)).sort((a, b) => a.position - b.position);
    setMenuItems(itemTrees)
  }, [items]);

  useEffect(() => {
    console.log('menuItems', menuItems)
  }, [menuItems]);

  const onSortEnd = (result) => {
    console.log('result', result)
    const {oldIndex, newIndex} = result;
    const id = result?.item?.dataset?.id;
    const parentId = result?.item?.parentNode?.closest('.MenuItem')?.dataset?.id;
    console.log(id, parentId,  oldIndex, newIndex)

    if(id && (oldIndex !== newIndex)) {
      // dispatch(updateMenuItem(
      //   Number(id),
      //   {
      //     parent_id: parentId || 0,
      //     position: newIndex + 1,
      //   }
      // ))
    }
  }

  return (
    <div className={styles.MenuList}>
      <ReactSortable onSort={onSortEnd} list={menuItems} setList={setMenuItems} {...sortableConfig}>
        {menuItems.map((item, index) => (
          <div key={item.id}>
            <MenuItemStack item={item} itemIndex={[index]} setItems={setMenuItems} onSortEnd={onSortEnd} />
          </div>
        ))}
      </ReactSortable>
    </div>
  )
}

export default MenuList