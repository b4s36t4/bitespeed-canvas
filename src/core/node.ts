import { XYPosition } from "reactflow";

export const generateBaseNode = (
  data: { type: string },
  position?: XYPosition
): INode | null => {
  switch (data.type) {
    case "TEXT_MESSAGE": {
      return {
        data: {
          properties: { message: { type: "textarea", name: "message" } },
        },
        id: crypto.randomUUID(),
        type: "TEXT_MESSAGE",
        position: position ?? { x: 0, y: 0 },
      };
    }
  }

  return null;
};
