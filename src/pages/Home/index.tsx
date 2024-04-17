import ReactFlow, {
  Controls,
  MiniMap,
  Background,
  BackgroundVariant,
  ReactFlowInstance,
} from "reactflow";
import { toast } from "react-hot-toast";
import "reactflow/dist/style.css";

import styles from "./_.module.css";
import { useCallback, useMemo, useRef } from "react";
import { useReactFlowState } from "../../hooks/useReactFlow";
import { generateBaseNode } from "../../core/node";
import { TextMessage } from "../../core/nodes/TextMessage";
import { PropertyPanel } from "../../layouts/PropertyPanel";

const Home = () => {
  const {
    edges,
    nodes,
    onConnect,
    onEdgesChange,
    onAddNode,
    onNodesChange,
    setSelectedNode,
  } = useReactFlowState();

  const dropRef = useRef(null);

  const flowRef = useRef<ReactFlowInstance | null>(null);

  const onSelect = useCallback(
    (node: INode) => {
      setSelectedNode(node);
    },
    [setSelectedNode]
  );

  const onDrop: React.DragEventHandler<HTMLDivElement> = (event) => {
    const eventData = event.dataTransfer.getData("text/reactflow");
    if (!eventData) {
      return;
    }
    const parsedData = JSON.parse(eventData);

    const position = flowRef.current?.screenToFlowPosition({
      x: event.clientX,
      y: event.clientY,
    });

    const generatedNode = generateBaseNode(parsedData, position);
    if (!generatedNode) {
      return;
    }

    onAddNode(generatedNode);
    toast.success("Added a new Node");
  };

  const onDragOver: React.DragEventHandler<HTMLDivElement> = useCallback(
    (event) => {
      event.preventDefault();
      event.dataTransfer.dropEffect = "move";
    },
    []
  );

  const nodeTypes = useMemo(() => ({ TEXT_MESSAGE: TextMessage }), []);

  return (
    <div ref={dropRef} className={styles.container}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
        onDrop={onDrop}
        nodeTypes={nodeTypes}
        onInit={(instance) => {
          flowRef.current = instance;
        }}
        onNodeClick={(_, node) => onSelect(node as INode)}
        deleteKeyCode={null}
        onDragOver={onDragOver}
      >
        <Controls />
        <MiniMap />
        <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
      </ReactFlow>
      <PropertyPanel key={"properties"} />
    </div>
  );
};

export default Home;
