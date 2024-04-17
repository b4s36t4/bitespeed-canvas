import { Drawer, TextInput, Textarea } from "@mantine/core";
import { useReactFlowState } from "../hooks/useReactFlow";
import { useCallback } from "react";

export const PropertyPanel = () => {
  const { selectedNode, setSelectedNode, updateProperty } = useReactFlowState();

  const children = useCallback(() => {
    if (!selectedNode?.data) {
      return null;
    }

    return Object.entries(selectedNode.data.properties ?? {}).map(
      ([name, property]) => {
        switch (property.type) {
          case "text": {
            return (
              <TextInput
                key={name}
                name={name}
                placeholder="Enter Value"
                label={name}
                value={property.value ?? ""}
                onChange={(e) => {
                  updateProperty(
                    selectedNode.id,
                    property.name,
                    e.target.value
                  );
                }}
              />
            );
          }
          case "textarea": {
            return (
              <Textarea
                key={name}
                name={name}
                placeholder={`Enter ${name}`}
                label={name}
                value={property.value ?? ""}
                onChange={(e) => {
                  updateProperty(
                    selectedNode.id,
                    property.name,
                    e.target.value
                  );
                }}
                resize="vertical"
              />
            );
          }
        }
      }
    );
  }, [selectedNode, updateProperty]);

  return (
    <Drawer
      position="right"
      onClose={() => {
        // compileUpdatedNode();
        setSelectedNode(null);
      }}
      offset={10}
      title="Edit Node"
      radius={"md"}
      opened={!!selectedNode}
    >
      {children()}
    </Drawer>
  );
};
