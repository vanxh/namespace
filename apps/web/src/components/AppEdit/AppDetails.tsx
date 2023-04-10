import useAppMetadata from "@/lib/hooks/useAppMetadata";
import { useStorage } from "@thirdweb-dev/react";
import { useState } from "react";
import {
  Input,
  Label,
  Textarea,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Button,
} from "ui";

const AppDetailsRow = ({
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

export default function AppDetails({ appName }: { appName: string }) {
  const { metadata, isLoading, error } = useAppMetadata(appName);
  const storage = useStorage();

  console.log(metadata);

  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  return (
    <div className="flex flex-col items-center justify-start w-full rounded-lg bg-white shadow-[0_20_20_60_#0000000D] overflow-hidden">
      <div className="p-4 md:p-8 w-full gap-y-6 flex flex-col">
        <div className="flex flex-col gap-y-2">
          <h3 className="text-[#101828] text-2xl font-semibold">App Details</h3>
          <p className="text-[#475467] text-sm">Edit your app details.</p>
        </div>

        <AppDetailsRow label="Name" isRequired>
          <Input
            placeholder={metadata.name ?? "Enter a name"}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </AppDetailsRow>
        <AppDetailsRow
          label="Description"
          description="Write a description of the app"
          isRequired
        >
          <Textarea
            placeholder={metadata.description ?? "Enter a description"}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </AppDetailsRow>

        <hr />

        <AppDetailsRow label="URL information">
          <div className="flex flex-col gap-y-2">
            <Label>
              URL
              <span className="text-red-500">*</span>
            </Label>
            <Input placeholder="https://bitpack.me" />
          </div>
          <div className="flex flex-col gap-y-2">
            <Label>Repo URL</Label>
            <Input placeholder="https://github.com/bitpack.me" />
          </div>
          <div className="flex flex-col gap-y-2">
            <Label>Dapp ID</Label>
            <Input placeholder="App ID" />
          </div>
        </AppDetailsRow>

        <hr />

        <AppDetailsRow label="Contracts">
          <div className="flex flex-col gap-y-2">
            <Label>Chain ID</Label>
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Chain ID" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">Ethereum</SelectItem>
                <SelectItem value="137">Polygon</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col gap-y-2">
            <Label>Contract</Label>
            <Input placeholder="App ID" />
          </div>
        </AppDetailsRow>

        <hr />

        <AppDetailsRow label="Geo Restrictions">
          <div className="flex flex-col gap-y-2">
            <Label>Allowed in Countries</Label>
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Countries" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col gap-y-2">
            <Label>Denied in Countries</Label>
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Countries" />
              </SelectTrigger>
              <SelectContent></SelectContent>
            </Select>
          </div>
        </AppDetailsRow>

        <hr />

        <AppDetailsRow label="Other Information">
          <div className="flex flex-col gap-y-2">
            <Label>Language</Label>
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">English</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col gap-y-2">
            <Label>Minimum Age</Label>
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select minimum age" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">3</SelectItem>
                <SelectItem value="all">5</SelectItem>
                <SelectItem value="all">13</SelectItem>
                <SelectItem value="all">18</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col gap-y-2">
            <Label>
              Version
              <span className="text-red-500">*</span>
            </Label>
            <Input placeholder="version" />
          </div>
          <div className="flex flex-col gap-y-2">
            <Label>Tags</Label>
            <Textarea placeholder="" />
          </div>
        </AppDetailsRow>

        <div className="w-full flex flex-row justify-end gap-x-4">
          <Button variant="outline">Cancel</Button>
          <Button>Save</Button>
        </div>
      </div>
    </div>
  );
}
