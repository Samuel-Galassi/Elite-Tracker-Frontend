interface ImportMetaEnv {
  readonly VITE_URL_API: string;
  readonly VITE_LOCALSTORAGE_KEY: string;
  // more env variables...
}
// biome-ignore lint/correctness/noUnusedVariables: import.meta is used in the codebase, but it is not recognized by the linter
interface ImportMeta {
  readonly env: ImportMetaEnv;
}
