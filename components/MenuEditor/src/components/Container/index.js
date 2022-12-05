import {ReactSortable} from "react-sortablejs";
import BlockWrapper from "../BlockWrapper";
import sortableConfig from "../../config/sortableConfig";

function Container({ block, blockIndex, setBlocks }) {
  return (
    <>
      <ReactSortable
        key={block.id}
        list={block.children}
        setList={(currentList) => {
          setBlocks((sourceList) => {
            const tempList = [...sourceList];
            const _blockIndex = [...blockIndex];
            const lastIndex = _blockIndex.pop();
            const lastArr = _blockIndex.reduce(
              (arr, i) => arr[i]["children"],
              tempList
            );
            console.log(lastIndex);
            lastArr[lastIndex]["children"] = currentList;
            return tempList;
          });
        }}
        {...sortableConfig}
      >
        {block.children &&
        block.children.map((childBlock, index) => {
          return (
            <BlockWrapper
              key={childBlock.id}
              block={childBlock}
              blockIndex={[...blockIndex, index]}
              setBlocks={setBlocks}
            />
          );
        })}
      </ReactSortable>
    </>
  );
}

export default Container