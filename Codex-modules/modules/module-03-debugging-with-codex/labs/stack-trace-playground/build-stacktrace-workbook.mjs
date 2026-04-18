import fs from "node:fs/promises";
import path from "node:path";
import { SpreadsheetFile, Workbook } from "@oai/artifact-tool";

const outputDir = "C:/codex-training/codex-training-labs/Codex-modules/modules/module-03-debugging-with-codex/labs/stack-trace-playground";
const xlsxPath = path.join(outputDir, "stacktrace.xlsx");
const xlsPath = path.join(outputDir, "stacktrace.xls");

const rows = [
  [
    "TypeError",
    "src/components/Dashboard.jsx:42",
    "The component tries to read `items` from an undefined object during render.",
    "Guard the access or initialize the missing object before render, for example by defaulting the source data to an object with `items: []`."
  ],
  [
    "Warning",
    "src/hooks/useCounter.ts:24",
    "A mutable ref value is being used to derive reactive state, so React cannot track updates correctly.",
    "Move the derived value into state, memoized computation, or effect logic driven by stable dependencies instead of `countRef.current`."
  ],
  [
    "TypeError",
    "src/routes/auth.js:18",
    "The route destructures `req.body` before JSON body parsing or request validation guarantees that it exists.",
    "Enable JSON middleware and safely default `req.body` before destructuring, then return a validation error when the payload is missing."
  ],
  [
    "Error",
    "src/server.js:6",
    "Startup imports a controller path that does not exist or does not match the actual filename.",
    "Fix the `require` path or restore the missing `controllers/userController` module so startup resolves cleanly."
  ],
  [
    "EADDRINUSE",
    "src/server.js:38",
    "The server is trying to bind to port 4000 while another process is already using it.",
    "Stop the process using port 4000 or change the app to use a free port through configuration."
  ]
];

const workbook = Workbook.create();
const sheet = workbook.worksheets.add("Stack Traces");
sheet.showGridLines = false;

sheet.getRange("A1:D6").values = [
  ["error type", "failing file and line", "root cause", "safe fix"],
  ...rows
];

sheet.freezePanes.freezeRows(1);

sheet.getRange("A1:D1").format = {
  fill: "#1D4ED8",
  font: { bold: true, color: "#FFFFFF" },
  horizontalAlignment: "center",
  verticalAlignment: "center"
};

sheet.getRange("A2:D6").format = {
  verticalAlignment: "top",
  wrapText: true
};

sheet.getRange("A2:A6").format = { horizontalAlignment: "center" };
sheet.getRange("A1:A6").format.columnWidthPx = 120;
sheet.getRange("B1:B6").format.columnWidthPx = 220;
sheet.getRange("C1:C6").format.columnWidthPx = 360;
sheet.getRange("D1:D6").format.columnWidthPx = 420;
sheet.getRange("A1:D6").format.rowHeightPx = 54;
sheet.getRange("A1:D6").format.borders = {
  top: { style: "thin", color: "#CBD5E1" },
  bottom: { style: "thin", color: "#CBD5E1" },
  left: { style: "thin", color: "#CBD5E1" },
  right: { style: "thin", color: "#CBD5E1" }
};
sheet.getRange("A2:D6").conditionalFormats.addCustom("=ISEVEN(ROW())", {
  fill: "#EFF6FF"
});

await workbook.inspect({
  kind: "table",
  range: "Stack Traces!A1:D6",
  include: "values",
  tableMaxRows: 6,
  tableMaxCols: 4
});

await fs.mkdir(outputDir, { recursive: true });
const output = await SpreadsheetFile.exportXlsx(workbook);
await output.save(xlsxPath);
await fs.copyFile(xlsxPath, xlsPath);

