import MenuItem from "../MenuItem";
import styles from './styles.module.scss'
import {ReactSortable} from "react-sortablejs";
import sortableConfig from "../../config/sortableConfig";

const MenuItemStack = ({ item, itemIndex, setItems, onSortEnd }) => {
  if(!item) return null;

  return (
    <div className={styles.MenuItemStack}>
      <MenuItem item={item}/>
      {Array.isArray(item.children) && item.children.length > 0 && (
        <div>
          <ReactSortable
            onEnd={onSortEnd}
            list={item.children}
            setList={(currentList) => {
              console.log('setList 2', currentList)
              setItems((sourceList) => {
                const tempList = [...sourceList];
                const _itemIndex = [...itemIndex];
                const lastIndex = _itemIndex.pop();
                const lastArr = _itemIndex.reduce(
                  (arr, i) => arr[i]["children"],
                  tempList
                );
                lastArr[lastIndex]["children"] = currentList;
                console.log('tempList', tempList)
                return tempList;
              });
            }}
            {...sortableConfig}
          >
            {item.children.map((child, childIndex) => {
              return (
                <div key={child.id} className="MenuItem">
                  <MenuItemStack item={child} itemIndex={[...itemIndex, childIndex]} setItems={setItems} onSortEnd={onSortEnd} />
                </div>
              )
            })}
          </ReactSortable>
        </div>
      )}
    </div>
  )
}

export default MenuItemStack;