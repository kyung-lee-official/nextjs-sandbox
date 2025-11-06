"use client";

import { useState } from "react";
import axios from "axios";

export const GenerateXlsx = () => {
	const [isGenerating, setIsGenerating] = useState(false);

	const generateLargeExcel = async () => {
		setIsGenerating(true);

		try {
			const response = await axios.post(
				"/api/files/generate-large-excel",
				{},
				{
					headers: {
						"Content-Type": "application/json",
					},
				}
			);

			const result = response.data;
			alert(`Excel file generated successfully: ${result.filename}`);
		} catch (error) {
			console.error("Error generating Excel file:", error);
			alert("Failed to generate Excel file");
		} finally {
			setIsGenerating(false);
		}
	};

	return (
		<div className="p-6 max-w-4xl mx-auto">
			<h1 className="text-3xl font-bold mb-6">
				Upload Large XLSX to Database
			</h1>

			<div className="bg-white rounded-lg shadow-md p-6 mb-6">
				<h2 className="text-xl font-semibold mb-4">
					Generate Test Data
				</h2>
				<p className="text-gray-600 mb-4">
					Generate a large Excel file with 500,000 rows of mock data
					for testing purposes.
				</p>

				<button
					onClick={generateLargeExcel}
					disabled={isGenerating}
					className={`px-6 py-3 rounded-lg font-medium ${
						isGenerating
							? "bg-gray-400 cursor-not-allowed"
							: "bg-blue-600 hover:bg-blue-700"
					} text-white transition-colors`}
				>
					{isGenerating ? (
						<span className="flex items-center">
							<div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
							Generating Excel File...
						</span>
					) : (
						"Generate 500K Rows Excel File"
					)}
				</button>
			</div>

			<div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
				<div className="flex">
					<div className="ml-3">
						<p className="text-sm text-yellow-700">
							<strong>Note:</strong> The generated file will be
							saved in the `temp` folder at the project root.
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};
