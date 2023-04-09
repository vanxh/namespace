import { Tabs, TabsContent, TabsList, TabsTrigger } from "ui";

import AppDetails from "./AppDetails";
import AppBuild from "./AppBuild";

export default function AppEdit() {
  return (
    <Tabs defaultValue="details">
      <TabsList>
        <TabsTrigger value="details">App Details</TabsTrigger>
        <TabsTrigger value="build">Build</TabsTrigger>
        <TabsTrigger value="images">App Images</TabsTrigger>
      </TabsList>

      <TabsContent value="details">
        <AppDetails />
      </TabsContent>

      <TabsContent value="build">
        <AppBuild />
      </TabsContent>

      <TabsContent value="images">{/* TODO */}</TabsContent>
    </Tabs>
  );
}
