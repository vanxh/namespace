import { Tabs, TabsContent, TabsList, TabsTrigger } from "ui";

import AppDetails from "./AppDetails";
import AppBuild from "./AppBuild";
import AppImages from "./AppImages";

export default function AppEdit({ appName }: { appName: string }) {
  return (
    <Tabs defaultValue="details">
      <TabsList>
        <TabsTrigger value="details">App Details</TabsTrigger>
        <TabsTrigger value="build">Build</TabsTrigger>
        <TabsTrigger value="images">App Images</TabsTrigger>
      </TabsList>

      <TabsContent value="details">
        <AppDetails appName={appName} />
      </TabsContent>

      <TabsContent value="build">
        <AppBuild appName={appName} />
      </TabsContent>

      <TabsContent value="images">
        <AppImages appName={appName} />
      </TabsContent>
    </Tabs>
  );
}
