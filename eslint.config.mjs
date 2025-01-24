import eslintPluginReact from "eslint-plugin-react"
import eslintPluginReactHooks from "eslint-plugin-react-hooks"
import eslintPluginTypeScript from "@typescript-eslint/eslint-plugin"
import eslintPluginPrettier from "eslint-plugin-prettier"
import parserTypeScript from "@typescript-eslint/parser"

export default [
	{
		files: ["**/*.{js,jsx,ts,tsx}"], // Definiuje pliki, do których ma zastosowanie konfiguracja
		languageOptions: {
			ecmaVersion: 2020,
			sourceType: "module",
			parser: parserTypeScript,
			globals: {
				window: true,
				document: true,
				console: true,
			},
		},
		plugins: {
			react: eslintPluginReact,
			"react-hooks": eslintPluginReactHooks,
			"@typescript-eslint": eslintPluginTypeScript,
			prettier: eslintPluginPrettier,
		},
		rules: {
			// Dodaj swoje reguły
			"prettier/prettier": "error",
			indent: ["error", "tab"], // 4 spacje
			// "no-tabs": "off",
		},
		ignores: ["node_modules", "build", ".next", "out"], // Ignorowane pliki
	},
]
