type INode = import("reactflow").Node<INodeData, INodeType> & {
  type: INodeType;
};
type IEdge = import("reactflow").Edge;

type INodeType = "TEXT_MESSAGE" | "REPLY_MESSAGE" | "VOICE_MESSAGE";

interface INodeTextProperties {
  name: string;
  value?: string | null;
}

interface INodeRadioProperties {
  name: string;
  value?: string | string[] | null;
  multiple?: boolean;
  options: string[] | { label: string; value: string | number }[];
}

type INodeProperty =
  | ({ type: "text" | "textarea" } & INodeTextProperties)
  | ({ type: "radio" } & INodeRadioProperties);

type INodeData = { properties: { [key: string]: INodeProperty } };

// interface INode extends FlowNode<INodeData, INodeType> {}

type IEdge = FlowEdge & { color: string };
