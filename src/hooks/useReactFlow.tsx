import {
  OnConnect,
  addEdge,
  applyNodeChanges,
  OnNodesChange,
  OnEdgesChange,
  applyEdgeChanges,
  MarkerType,
} from "reactflow";
import { create } from "zustand";
import { useShallow } from "zustand/react/shallow";

// import { produce } from "immer";

interface IStore {
  nodes: INode[];
  edges: IEdge[];
  onNodesChange: OnNodesChange;
  onEdgesChange: OnEdgesChange;
  selectedNode: INode | null;
  onConnect: OnConnect;
  onAddNode: (node: INode) => void;
  setSelectedNode: (node: INode | null) => void;
  updateProperty: (nodeId: string, propertyName: string, value: string) => void;
  compileUpdatedNode: () => void;
  setNodes: (nodes: INode[]) => void;
  setEdges: (edges: IEdge[]) => void;
}

const newStore = create<IStore>((set, get) => ({
  nodes: [],
  edges: [],
  onNodesChange: (changes) => {
    set({
      nodes: applyNodeChanges<INodeData>(changes, get().nodes) as INode[],
    });
  },
  onEdgesChange: (changes) => {
    set({ edges: applyEdgeChanges(changes, get().edges) });
  },
  selectedNode: null,
  onConnect: (connection) => {
    set({
      edges: addEdge(
        { ...connection, markerEnd: { type: MarkerType.Arrow } },
        get().edges
      ),
    });
  },
  onAddNode: (node) => {
    set({ nodes: [...get().nodes, node] });
  },
  setSelectedNode: (node: INode | null) => {
    set({ selectedNode: node });
  },
  updateProperty: (_nodeId, propertyName, value) => {
    const updatedNode = { ...get().selectedNode };

    if (!updatedNode) {
      return;
    }

    if (!updatedNode.data) {
      return;
    }

    const property = updatedNode.data.properties[propertyName];

    if (!property) {
      return;
    }

    updatedNode.data.properties = {
      ...updatedNode.data.properties,
      [propertyName]: { ...property, value: value },
    };

    set({ selectedNode: updatedNode as INode });
  },
  compileUpdatedNode: () => {
    const selectedNode = get().selectedNode;

    if (!selectedNode) {
      return;
    }

    const nodes = get().nodes;

    const nodeIndex = nodes.findIndex((node) => node.id === selectedNode?.id);

    if (nodeIndex < 0) {
      return;
    }

    nodes.splice(nodeIndex, 1, selectedNode);
  },
  setNodes: (nodes: INode[]) => {
    set({ nodes });
  },
  setEdges: (edges: IEdge[]) => {
    set({ edges });
  },
}));

export const useReactFlowState = () =>
  newStore(useShallow((state) => ({ ...state })));
