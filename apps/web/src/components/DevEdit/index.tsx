import { Tabs, TabsContent, TabsList, TabsTrigger } from "ui";

export default function DevEdit() {
  return (
    <Tabs defaultValue="details">
      <TabsList>
        <TabsTrigger value="details">Publisher Details</TabsTrigger>
      </TabsList>

      <TabsContent value="details">{/* TODO */}</TabsContent>
    </Tabs>
  );
}
