"use client";

import dayjs from "dayjs";
import { useState } from "react";
import { DatePicker } from "./date-picker/DatePicker";
import { MonthPicker } from "./month-picker/MonthPicker";
import { YearPicker } from "./year-picker/YearPicker";

export const Content = () => {
	const [date, setDate] = useState<dayjs.Dayjs>(dayjs());
	const [month, setMonth] = useState<dayjs.Dayjs>(dayjs());
	const [year, setYear] = useState<dayjs.Dayjs>(dayjs());

	return (
		<div className="flex flex-col gap-3">
			<h1 className="text-lg">Time consistency</h1>
			<div
				className="w-1/2 p-3
				border-dashed border-black border-2"
			>
				<p>
					When dealing with time, you should always assume that server
					only accepts UTC time, because the server side does not know
					the timezone of the client.
				</p>
				<div>
					<h2
						className="p-1 mb-4
						border-dashed border-black border-2"
					>
						date picker {date.toISOString()}
					</h2>
					<DatePicker date={date} setDate={setDate} />
				</div>
			</div>
			<div
				className="w-1/2 p-3
				border-dashed border-black border-2"
			>
				<p>
					Time inconsistency could happen when referring to a time
					range instead of a specific time. For example, year and
					month.
				</p>
				<p>
					Let us say your timezone is UTC+8, and an entity is created
					at 2025-01-01 01:00:00 (local), the corresponding UTC time
					in database will be 2024-12-31T17:00:00.000Z, if your try to
					search entities created in year 2025, you are actually
					searching entities created at 2024-12-31T16:00:00.000Z to
					2025-12-31T15:59:59.999Z, which gives you correct results
					based on your timezone.
				</p>
				<p>
					That is to say, when searching entities within a time range,
					you should always specify the start and end time before
					sending the request. Because the frontend knows the timezone
					of the user, while the backend does not.
				</p>
				<p>
					You cannot say{" "}
					<i>hey server, give me entities created in year 2025</i>,
					because the <b>server does not know your timezone</b>.
				</p>
				<div className="mb-4">
					<h2
						className="p-1 mb-4
						border-dashed border-black border-2"
					>
						month picker {month.toISOString()} -{" "}
						{month.add(1, "month").toISOString()}
					</h2>
					<MonthPicker date={month} setDate={setMonth} />
				</div>
				<div>
					<h2
						className="p-1 mb-4
						border-dashed border-black border-2"
					>
						year picker {year.toISOString()} -{" "}
						{year.add(1, "year").toISOString()}
					</h2>
					<YearPicker date={year} setDate={setYear} />
				</div>
			</div>
		</div>
	);
};
