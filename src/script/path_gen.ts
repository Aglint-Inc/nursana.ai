/* eslint-disable security/detect-non-literal-regexp */
import { readdirSync, writeFileSync } from "fs";
import * as path from "path";

const skipFiles = ["/_app", "/_document", "/api"];

function processDirectory(
  rootDirs: {
    [key: string]: { basePath: string; appRouter: boolean };
  },
  outputFiles: {
    path: string;
    objectName: string;
    // eslint-disable-next-line no-unused-vars
    filter?: (x: string[]) => string[];
  }[]
) {
  let result: string[] = [];

  function walkDirectory(
    rootDir: string,
    dir: string,
    {
      base = "",
      appRouter = false,
    }: {
      base?: string;
      appRouter?: boolean;
    } = {}
  ) {
    // eslint-disable-next-line security/detect-non-literal-fs-filename
    const entries = readdirSync(dir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);

      if (entry.isDirectory()) {
        if (entry.name.startsWith("_")) {
          continue;
        }
        walkDirectory(rootDir, fullPath, { base, appRouter });
      } else if (entry.isFile()) {
        if (entry.name.startsWith("type")) {
          continue;
        } else if (
          entry.name.startsWith("index") ||
          entry.name.startsWith("route") ||
          entry.name.startsWith("page")
        ) {
          let filePath = dir.replace(rootDir, base);
          if (appRouter) {
            filePath = filePath
              .split(path.sep)
              .filter((item) => !item.startsWith("("))
              .join(path.sep);
          }
          result.push(filePath);
        } else if (!appRouter) {
          const filePath = fullPath
            .replace(/\.ts$|\.js$|\.jsx$|\.tsx$/, "")
            .replace(rootDir, base);
          result.push(filePath);
        }
      }
    }
  }

  Object.keys(rootDirs).map((rootDir) =>
    walkDirectory(rootDir, rootDir, {
      base: rootDirs[String(rootDir)].basePath,
      appRouter: rootDirs[String(rootDir)].appRouter,
    })
  );

  // filter out wrong PATH SEPARATOR

  if (path.sep === path.win32.sep) {
    result = result.map((item) =>
      // eslint-disable-next-line security/detect-non-literal-fs-filename
      item.replace(new RegExp("\\" + path.win32.sep, "g"), "/")
    );
  }

  // write to file
  outputFiles.forEach((item) => {
    const tempResult = (item.filter?.(item.filter(result)) || result).filter(
      (path) => path.length && !skipFiles.includes(path)
    );

    // eslint-disable-next-line security/detect-non-literal-fs-filename
    writeFileSync(
      item.path,
      `export const ${item.objectName} = ${JSON.stringify(tempResult, null, 2).replace(/"/g, "'")} as const`,
      "utf-8"
    );
    // [\n${tempResult
    //     .sort()
    //     .map((item) => "'" + item + "'")
    //     .join(',\n')}\n]
  });
}

const rootDirectory = {
  [path.join("src", "app")]: {
    basePath: "",
    appRouter: true,
  },
};

const allPathOutputFile = path.join("src/constant", "allPaths.ts");
const apiPathOutputFile = path.join("src/constant", "apiPaths.ts");

processDirectory(rootDirectory, [
  { path: allPathOutputFile, objectName: "PATHS" },
  {
    path: apiPathOutputFile,
    objectName: "API_PATHS",
    filter: (x) => x.filter((item) => item.startsWith("/api")),
  },
]);

import { generateSaveTypeSafePath } from "./gen_type_path";

const outputTypeSafePathFile = path.join("src/constant", "typeSafeParams.ts");

generateSaveTypeSafePath().then((data) => {
  const updatedFileContent = `export const TYPE_SAFE_PARAMS = ${JSON.stringify(
    data,
    null,
    2
  ).replace(/"/g, "'")} as const\n`;
  writeFileSync(outputTypeSafePathFile, updatedFileContent, "utf-8");
});
