import { useState } from "react";
import { Input, Label, Button, RadioGroup, RadioGroupItem } from "ui";

const AppBuildRow = ({
  children,
  label,
  description,
  isRequired,
}: {
  children: React.ReactNode;
  label: string;
  description?: string;
  isRequired?: boolean;
}) => {
  return (
    <div className="flex flex-row w-full">
      <div className="w-[40%] flex flex-col gap-y-1">
        <span className="text-sm font-medium">
          {label}
          {isRequired && <span className="text-red-500">*</span>}
        </span>
        {description && <span className="text-sm">{description}</span>}
      </div>
      <div className="w-[60%] flex flex-col gap-y-4">{children}</div>
    </div>
  );
};

export default function AppBuild() {
  const [appType, setAppType] = useState<"android" | "web" | "ios">("android");

  const isAndroid = appType === "android";
  const isWeb = appType === "web";
  const isIOS = appType === "ios";

  return (
    <div className="flex flex-col items-center justify-start w-full rounded-lg bg-white shadow-[0_20_20_60_#0000000D] overflow-hidden">
      <div className="p-4 md:p-8 w-full gap-y-6 flex flex-col">
        <div className="flex flex-col gap-y-2">
          <h3 className="text-[#101828] text-2xl font-semibold">Build</h3>
          <p className="text-[#475467] text-sm">Edit your app build details.</p>
        </div>

        <AppBuildRow label="App Type" isRequired>
          <RadioGroup defaultValue={appType}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem
                onClick={(e) => {
                  setAppType("android");
                }}
                value="android"
                id="android"
              />
              <Label htmlFor="android">Android</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem
                onClick={(e) => {
                  setAppType("web");
                }}
                value="web"
                id="web"
              />
              <Label htmlFor="web">Web</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem
                onClick={(e) => {
                  setAppType("ios");
                }}
                value="ios"
                id="ios"
                disabled
              />
              <Label htmlFor="ios">iOS</Label>
            </div>
          </RadioGroup>
        </AppBuildRow>

        <hr />

        {isAndroid && <AppBuildRow label="Android">TODO</AppBuildRow>}

        {isWeb && <AppBuildRow label="Web">TODO</AppBuildRow>}

        {isIOS && <AppBuildRow label="iOS">TODO</AppBuildRow>}

        <div className="w-full flex flex-row justify-end gap-x-4">
          <Button variant="outline">Cancel</Button>
          <Button>Save</Button>
        </div>
      </div>
    </div>
  );
}
