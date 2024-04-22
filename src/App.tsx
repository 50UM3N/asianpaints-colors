import { useState } from "react";
import { colors } from "./data";
function rgbToHex(rgbColor: string): string {
  // Regular expression to extract the RGB values
  const rgbRegex = /rgb\((\d+),\s*(\d+),\s*(\d+)\)/;
  const match = rgbColor.match(rgbRegex);

  if (!match) {
    throw new Error("Invalid RGB color format");
  }

  const [, r, g, b] = match.map(Number);

  // Convert RGB values to hexadecimal
  const rHex = r.toString(16).padStart(2, "0");
  const gHex = g.toString(16).padStart(2, "0");
  const bHex = b.toString(16).padStart(2, "0");

  return `#${rHex}${gHex}${bHex}`;
}
function App() {
  return (
    <div className="py-12 px-8">
      {colors.map((color, index) => (
        <div key={index} className="flex flex-wrap gap-4 py-8">
          {color.map((shade, index) => (
            <div key={index} className="w-[4%]">
              <div
                className="aspect-[2/1] w-full flex justify-center items-center group"
                style={{ background: shade.color }}
              >
                <a
                  target="_blank"
                  href={shade.url}
                  className="bg-white rounded-full px-2 text-xs cursor-pointer opacity-0 group-hover:opacity-100 transition-all ease-in-out duration-150 select-none"
                >
                  view
                </a>
              </div>
              <div className="flex justify-between pt-1">
                <CopyItem  value={shade.shadecode} />
                <CopyItem value={rgbToHex(shade.color)} />
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default App;

const CopyItem: React.FC<{ value: string }> = ({ value, ...rest }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Reset copied status after 2 seconds
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };
  return (
    <p className="text-[10px] cursor-pointer select-none" {...rest} onClick={handleCopy}>
      {copied ? <span className="text-green-500">Copied!</span> : value}
    </p>
  );
};
