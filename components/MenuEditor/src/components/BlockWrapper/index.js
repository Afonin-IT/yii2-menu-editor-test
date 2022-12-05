import MenuItem from "../MenuItem";
import Container from "../Container";

function BlockWrapper({ block, blockIndex, setBlocks }) {
  // console.log(block);
  if (!block) return null;
  if (block.children.length > 0) {
    return (
      <div style={{padding: 20}}>
        <div>
          <MenuItem item={block}/>
        </div>
        <Container
          block={block}
          setBlocks={setBlocks}
          blockIndex={blockIndex}
        />
      </div>
    );
  } else {
    return (
      <div style={{padding: 10}}>
        <MenuItem item={block}/>
      </div>
    );
  }
}

export default BlockWrapper;