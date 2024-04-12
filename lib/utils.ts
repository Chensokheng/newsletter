import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function generateDatesObjectForCurrentMonth() {
	const currentDate = new Date();
	const currentYear = currentDate.getFullYear();
	const currentMonth = currentDate.getMonth() + 1;
	const daysInMonth = new Date(currentYear, currentMonth, 0).getDate();
	let datesObject = {} as { [key: string]: number };
	for (let day = 1; day <= daysInMonth; day++) {
		const dateString = `${currentYear}-${currentMonth
			.toString()
			.padStart(2, "0")}-${day.toString().padStart(2, "0")}`;
		datesObject[dateString] = 0;
	}
	return datesObject;
}
