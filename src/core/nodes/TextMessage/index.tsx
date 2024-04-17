import { ActionIcon, Box, CloseIcon } from "@mantine/core";
import { Handle, NodeProps, Position, useReactFlow } from "reactflow";

import styles from "./_.module.css";

export const TextMessage = ({
  data,
  isConnectable,
  id,
}: NodeProps<INodeData>) => {
  const { deleteElements } = useReactFlow();
  const onDelete: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault();
    event.stopPropagation();
    deleteElements({ nodes: [{ id }] });
  };

  return (
    <>
      <Handle
        type="target"
        position={Position.Left}
        style={{ background: "#555" }}
        onConnect={(params) => console.log("handle onConnect", params)}
        isConnectable={isConnectable}
      />

      <Box className={styles.nodeHeader}>
        <p>Text Message</p>
        <ActionIcon
          classNames={{ root: styles.root }}
          style={{ height: 20 }}
          onClick={onDelete}
          size={10}
          w={"10px"}
          h={"10px"}
          variant="danger"
          aria-label="Delete"
        >
          <CloseIcon size="10px" />
        </ActionIcon>
      </Box>
      <div className={styles.nodeContainer}>
        <p>{`Type: Text message`}</p>
        {Object.entries(data.properties).map(([name, property]) => {
          if (!property.value) {
            return null;
          }
          return <p key={name}>{`${property.name}: ${property.value}`}</p>;
        })}
      </div>

      <Handle
        type="source"
        position={Position.Right}
        id="b"
        style={{ bottom: 10, top: "auto", background: "#555" }}
        isConnectable={isConnectable}
      />
    </>
  );
};
