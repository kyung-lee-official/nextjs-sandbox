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
			<div>
				<h2>date picker</h2>
				<DatePicker date={date} setDate={setDate} />
			</div>
			<div>
				<h2>month picker</h2>
				<MonthPicker date={month} setDate={setMonth} />
			</div>
			<div>
				<h2>year picker</h2>
				<YearPicker date={year} setDate={setYear} />
			</div>
		</div>
	);
};
