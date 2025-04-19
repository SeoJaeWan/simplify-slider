import tseslint from "typescript-eslint";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import baseConfig from "../../eslint.config.js";

export default tseslint.config(...baseConfig, {
  plugins: {
    "react-hooks": reactHooks,
    "react-refresh": reactRefresh,
  },
  rules: {
    "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
    ...reactHooks.configs.recommended.rules,
  },
});
