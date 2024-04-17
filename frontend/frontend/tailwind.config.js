/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			spacing: {
				1.8: "1.8rem", // Add a new spacing value for 1.8rem gap
			},
			colors: {
				"custom-blue": "#007bff",
			},
			fontFamily: {
				sans: [
					"Arial",
					"Verdana",
					"Helvetica",
					"Tahoma",
					"Calibri",
					"Tahoma",
					"Geneva",
					"Palatino",
					"Garamond",
					"Century Gothic",
					"Franklin Gothic",
					"Lucida Sans",
					"Trebuchet MS",
					"Comic Sans MS",
					"Impact",
					"Times New Roman",
					"Courier New",
					"Bodoni",
					"Futura",
					"Baskerville",
					"Myriad",
					"system-ui",
					"-apple-system",
					"Segoe UI",
					"Roboto",
					"Ubuntu",
					"Cantarell",
					"Noto Sans",
					"sans-serif",
				],
			},
		},
	},
	plugins: [require("tailwind-scrollbar-hide")],
};
