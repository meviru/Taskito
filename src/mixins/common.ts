const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];


const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const CommonMixin = {
    methods: {
        todayDate() {
            const date = new Date();
            const month = months[date.getMonth()];
            const day = date.getDate();
            const year = date.getFullYear();
            return month + " " + day + ", " + year;
        },
        daysOfTheWeek() {
            const week = [];
            const date = new Date();
            for (let i = 1; i <= 7; i++) {
                const first = date.getDate() - date.getDay() + i;
                const fullDate = new Date(date.setDate(first)).toISOString().slice(0, 10);
                const day = fullDate.slice(8, 10)
                const dayName = i == 7 ? weekday[0] : weekday[i];
                week.push({ "day": day, "weekday": dayName });
            }
            return week;
        },
        shortWeekday(weekday: string) {
            return weekday.slice(0, 3).toUpperCase();
        }
    }
}

export default CommonMixin;
