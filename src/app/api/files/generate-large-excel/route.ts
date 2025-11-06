import { NextRequest, NextResponse } from "next/server";
import ExcelJS from "exceljs";
import { nanoid } from "nanoid";
import fs from "fs";
import path from "path";

/* Mock data generators for performance */
const firstNames = [
	"John",
	"Jane",
	"Michael",
	"Sarah",
	"David",
	"Emily",
	"James",
	"Lisa",
	"Robert",
	"Amanda",
	"William",
	"Jessica",
	"Richard",
	"Ashley",
	"Joseph",
	"Brittany",
	"Thomas",
	"Samantha",
	"Charles",
	"Michelle",
	"Christopher",
	"Elizabeth",
	"Daniel",
	"Kimberly",
	"Matthew",
	"Amy",
	"Anthony",
	"Angela",
];

const lastNames = [
	"Smith",
	"Johnson",
	"Williams",
	"Brown",
	"Jones",
	"Garcia",
	"Miller",
	"Davis",
	"Rodriguez",
	"Martinez",
	"Hernandez",
	"Lopez",
	"Gonzalez",
	"Wilson",
	"Anderson",
	"Thomas",
	"Taylor",
	"Moore",
	"Jackson",
	"Martin",
	"Lee",
	"Perez",
	"Thompson",
	"White",
	"Harris",
	"Sanchez",
	"Clark",
];

const genders = ["Male", "Female", "Non-binary", "Prefer not to say"];

/* Fast random generators */
const getRandomName = () => {
	const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
	const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
	return `${firstName} ${lastName}`;
};

const getRandomGender = () => {
	return genders[Math.floor(Math.random() * genders.length)];
};

export async function POST(req: NextRequest) {
	try {
		/* Create temp directory if it doesn't exist */
		const tempDir = path.join(process.cwd(), "temp");
		if (!fs.existsSync(tempDir)) {
			fs.mkdirSync(tempDir, { recursive: true });
			console.log("Created temp directory");
		}

		/* Ensure .gitignore includes temp folder */
		const gitignorePath = path.join(process.cwd(), ".gitignore");
		if (fs.existsSync(gitignorePath)) {
			const gitignoreContent = fs.readFileSync(gitignorePath, "utf-8");
			if (!gitignoreContent.includes("temp/")) {
				fs.appendFileSync(
					gitignorePath,
					"\n# Temporary files\ntemp/\n"
				);
				console.log("Added temp/ to .gitignore");
			}
		}

		/* Create Excel workbook */
		const workbook = new ExcelJS.Workbook();
		const worksheet = workbook.addWorksheet("Mock Data");

		/* Set up headers */
		worksheet.columns = [
			{ header: "Name", key: "name", width: 25 },
			{ header: "Gender", key: "gender", width: 15 },
			{ header: "Bio-ID", key: "bioId", width: 20 },
		];

		/* Style the header row */
		worksheet.getRow(1).font = { bold: true };
		worksheet.getRow(1).fill = {
			type: "pattern",
			pattern: "solid",
			fgColor: { argb: "FFE0E0E0" },
		};

		console.log("Starting data generation for 500,000 rows...");
		const startTime = Date.now();

		/* Generate data in batches for better performance */
		const batchSize = 10000;
		const totalRows = 500000;
		const batches = Math.ceil(totalRows / batchSize);

		for (let batch = 0; batch < batches; batch++) {
			const batchData = [];
			const rowsInBatch = Math.min(
				batchSize,
				totalRows - batch * batchSize
			);

			/* Pre-generate nanoids for this batch */
			const bioIds = Array.from({ length: rowsInBatch }, () =>
				nanoid(12)
			);

			for (let i = 0; i < rowsInBatch; i++) {
				batchData.push({
					name: getRandomName(),
					gender: getRandomGender(),
					bioId: bioIds[i],
				});
			}

			/* Add batch to worksheet */
			worksheet.addRows(batchData);

			/* Log progress */
			const progress = Math.round(((batch + 1) / batches) * 100);
			console.log(
				`Progress: ${progress}% (Batch ${batch + 1}/${batches})`
			);
		}

		const generationTime = Date.now() - startTime;
		console.log(`Data generation completed in ${generationTime}ms`);

		/* Generate filename with timestamp */
		const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
		const filename = `mock-data-500k-${timestamp}.xlsx`;
		const filepath = path.join(tempDir, filename);

		console.log("Writing Excel file...");
		const writeStartTime = Date.now();

		/* Write the file */
		await workbook.xlsx.writeFile(filepath);

		const writeTime = Date.now() - writeStartTime;
		const totalTime = Date.now() - startTime;

		console.log(`Excel file written in ${writeTime}ms`);
		console.log(`Total process completed in ${totalTime}ms`);

		/* Get file size */
		const stats = fs.statSync(filepath);
		const fileSizeMB = (stats.size / (1024 * 1024)).toFixed(2);

		return NextResponse.json({
			success: true,
			filename,
			filepath,
			rows: totalRows + 1, // +1 for header
			fileSizeMB: `${fileSizeMB} MB`,
			generationTimeMs: generationTime,
			writeTimeMs: writeTime,
			totalTimeMs: totalTime,
		});
	} catch (error) {
		console.error("Error generating Excel file:", error);
		return NextResponse.json(
			{
				success: false,
				error: "Failed to generate Excel file",
				details:
					error instanceof Error ? error.message : "Unknown error",
			},
			{ status: 500 }
		);
	}
}
