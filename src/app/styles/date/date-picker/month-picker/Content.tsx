"use client";

import dayjs from "dayjs";
import { useState } from "react";
import { MonthPicker } from "./MonthPicker";

export const Content = () => {
	const [date, setDate] = useState<dayjs.Dayjs>(dayjs());

	return (
		<div>
			<h2>month picker</h2>
			<MonthPicker date={date} setDate={setDate} />
		</div>
	);
};
