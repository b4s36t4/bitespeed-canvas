import { AppShell, Burger, Button, Flex, Title } from "@mantine/core";
import { getConnectedEdges } from "reactflow";
import { useDisclosure } from "@mantine/hooks";
import { Outlet } from "react-router-dom";
import { NavBar } from "../components/NavBar";
import { useCallback } from "react";
import { useReactFlowState } from "../hooks/useReactFlow";
import toast from "react-hot-toast";

const RootLayout = () => {
  const [opened, { toggle }] = useDisclosure();

  const { nodes, edges } = useReactFlowState();

  const onSave = useCallback(() => {
    const connections = getConnectedEdges(nodes, edges);

    const targetNodeIds = connections.map((connection) => connection.target);

    const noTargets = nodes.filter((node) => {
      return !targetNodeIds.includes(node.id);
    });

    if (noTargets.length > 1) {
      toast.error("Invalid Connections");
      return;
    }
  }, [nodes, edges]);

  return (
    <AppShell
      header={{ height: 80 }}
      navbar={{ width: 400, breakpoint: "md", collapsed: { mobile: !opened } }}
      padding={"sm"}
    >
      <AppShell.Header>
        <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
        <Flex align={"center"} justify={"center"}>
          <Title order={2} my={"md"} w={"min-content"}>
            Bitespeed
          </Title>

          <Button onClick={onSave} variant="gradient" ml={"lg"}>
            Save
          </Button>
        </Flex>
      </AppShell.Header>

      <AppShell.Navbar p="md">
        <NavBar />
      </AppShell.Navbar>

      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
};

export default RootLayout;
