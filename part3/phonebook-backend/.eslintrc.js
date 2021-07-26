module.exports = {
	"env": {
		"commonjs": true,
		"es2021": true,
		"node": true
	},
	"extends": "eslint:recommended",
	"parserOptions": {
		"ecmaVersion": 12
	},
	"rules": {
		"no-console": 0,
		"no-unused-vars": 0,
		"indent": "off",
		"eqeqeq": "error",
		"no-trailing-spaces": "error",
		"linebreak-style": [
			"error",
			"unix"
		],
		"quotes": [
			"error",
			"double"
		],
		"semi": [
			"error",
			"never"
		],
		"object-curly-spacing": [
			"error",
			"always"
		],
		"arrow-spacing": [
			"error", { "before": true, "after": true }
		]
	}
}
