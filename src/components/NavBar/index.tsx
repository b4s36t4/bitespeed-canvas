import { Box, Title } from "@mantine/core";
import { draggable } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import { useEffect, useRef } from "react";

import styles from "./_.module.css";

const TextNode = () => {
  const ref = useRef(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) {
      return;
    }

    draggable({
      element: element,
      getInitialData: () => ({ type: "TEXT_MESSAGE" }),
      getInitialDataForExternal: () => ({
        "text/reactflow": JSON.stringify({ type: "TEXT_MESSAGE" }),
      }),
    });
  }, []);

  return (
    <Box ref={ref} className={styles.node}>
      <p style={{ textAlign: "center" }}>Text Message</p>
    </Box>
  );
};

export const NavBar = () => {
  return (
    <div>
      <Title style={{ textAlign: "center" }} mb={"md"} order={4}>
        Drag & Drop a Node{" "}
      </Title>

      <TextNode />
    </div>
  );
};
