import { useSDK, useStorage } from "@thirdweb-dev/react";
import { useEffect, useState } from "react";
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

import { env } from "@/env/schema.mjs";
import useAppMetadata from "@/lib/hooks/useAppMetadata";
import { toast } from "sonner";

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
  const sdk = useSDK();
  const storage = useStorage();

  console.log(metadata);
  const [saving, setSaving] = useState(false);

  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const [appUrl, setAppUrl] = useState("");
  const [repoUrl, setRepoUrl] = useState("");
  const [dappId, setDappId] = useState("");

  const [chainId, setChainId] = useState<"1" | "137" | "80001">();

  useEffect(() => {
    if (metadata.chainId) {
      setChainId(metadata.chainId);
    }
  }, [metadata]);

  const [contractAddress, setContractAddress] = useState("");

  const [allowedCountries, setAllowedCountries] = useState([]);
  const [deniedCountries, setDeniedCountries] = useState([]);

  useEffect(() => {
    if (metadata.allowedCountries) {
      setAllowedCountries(metadata.allowedCountries);
    }

    if (metadata.deniedCountries) {
      setDeniedCountries(metadata.deniedCountries);
    }
  }, [metadata]);

  const [language, setLanguage] = useState("english");
  const [minimumAge, setMinimumAge] = useState(0);

  useEffect(() => {
    if (metadata.language) {
      setLanguage(metadata.language);
    }

    if (metadata.minimumAge) {
      setMinimumAge(metadata.minimumAge);
    }
  }, [metadata]);

  const [version, setVersion] = useState("");

  const [tags, setTags] = useState<string[]>([]);

  useEffect(() => {
    if (metadata.tags) {
      setTags(metadata.tags);
    }
  }, [metadata]);

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
            <Input
              placeholder={metadata.appUrl ?? "https://bitpack.me"}
              value={appUrl}
              onChange={(e) => setAppUrl(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-y-2">
            <Label>Repo URL</Label>
            <Input
              placeholder={metadata.repoUrl ?? "https://github.com/bitpack.me"}
              value={repoUrl}
              onChange={(e) => setRepoUrl(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-y-2">
            <Label>Dapp ID</Label>
            <Input
              placeholder={metadata.dappId ?? "App ID"}
              value={dappId}
              onChange={(e) => setDappId(e.target.value)}
            />
          </div>
        </AppDetailsRow>

        <hr />

        <AppDetailsRow label="Contracts">
          <div className="flex flex-col gap-y-2">
            <Label>Chain ID</Label>
            <Select
              onValueChange={(v) => {
                setChainId(v as any);
              }}
              value={chainId}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Chain ID" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">Ethereum</SelectItem>
                <SelectItem value="137">Polygon</SelectItem>
                <SelectItem value="80001">Mumbai</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col gap-y-2">
            <Label>Contract</Label>
            <Input
              placeholder={metadata.contractAddress ?? "App ID"}
              value={contractAddress}
              onChange={(e) => setContractAddress(e.target.value)}
            />
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
            <Select
              value={language}
              onValueChange={(v) => {
                setLanguage(v);
              }}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="english">English</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col gap-y-2">
            <Label>Minimum Age</Label>
            <Select
              onValueChange={(v) => {
                setMinimumAge(parseInt(v));
              }}
              value={`${minimumAge}`}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select minimum age" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0">Allow all age groups</SelectItem>
                <SelectItem value="3">3</SelectItem>
                <SelectItem value="5">5</SelectItem>
                <SelectItem value="13">13</SelectItem>
                <SelectItem value="18">18</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col gap-y-2">
            <Label>
              Version
              <span className="text-red-500">*</span>
            </Label>
            <Input
              placeholder={metadata.version ?? "version"}
              value={version}
              onChange={(e) => setVersion(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-y-2">
            <Label>Tags</Label>
            <Textarea placeholder="" />
          </div>
        </AppDetailsRow>

        <div className="w-full flex flex-row justify-end gap-x-4">
          <Button variant="outline">Cancel</Button>
          <Button
            disabled={isLoading || saving}
            onClick={async () => {
              if (!storage || !sdk) return;

              setSaving(true);

              const newMetadata = {
                ...metadata,
              };

              if (name) {
                newMetadata.name = name;
              }

              if (description) {
                newMetadata.description = description;
              }

              if (appUrl) {
                newMetadata.appUrl = appUrl;
              }

              if (repoUrl) {
                newMetadata.repoUrl = repoUrl;
              }

              if (dappId) {
                newMetadata.dappId = dappId;
              }

              if (chainId) {
                newMetadata.chainId = chainId;
              }

              if (contractAddress) {
                newMetadata.contractAddress = contractAddress;
              }

              newMetadata.allowedCountries = allowedCountries;
              newMetadata.deniedCountries = deniedCountries;

              newMetadata.language = language;
              newMetadata.minimumAge = minimumAge;

              if (version) {
                newMetadata.version = version;
              }

              newMetadata.tags = tags;

              const uri = await storage.upload(newMetadata);

              const appContract = await sdk.getContract(
                env.NEXT_PUBLIC_APP_CONTRACT_ADDRESS
              );

              try {
                const tokenId = await appContract.call(
                  "tokenIdForAppName",
                  appName
                );

                if (!tokenId) {
                  throw new Error("Invalid app name");
                }

                await appContract.call("updateTokenURI", tokenId, uri);

                toast.success("App updated successfully");
              } catch (e) {
                const err = `${e}`;
                toast.error(err);
              }

              setSaving(false);
            }}
          >
            Save
          </Button>
        </div>
      </div>
    </div>
  );
}
