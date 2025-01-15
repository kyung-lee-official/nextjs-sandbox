"use client";

import dayjs from "dayjs";
import { DateRange, DateRangePicker } from "./date-range-picker/DateRangePicker";
import { useState } from "react";

export const Content = () => {
	const [range, setRange] = useState<DateRange>({
		start: dayjs().startOf("month"),
		end: dayjs().endOf("month"),
	});

	return (
		<div>
			<h2>date range picker</h2>
			<DateRangePicker range={range} setRange={setRange} />
		</div>
	);
};
