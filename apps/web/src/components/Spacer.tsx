export default function Spacer({
  direction = "vertical",
}: {
  direction?: "vertical" | "horizontal";
}) {
  return <div className={direction === "vertical" ? "my-auto" : "mx-auto"} />;
}
