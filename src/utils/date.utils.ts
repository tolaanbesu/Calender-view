export const startOfWeek = (date: Date) =>{
    const d = new Date(date);
    const day = d.getDay();
    const diff = d.getDate()-day;
    const start = new Date(d.getFullYear(),d.getMonth(),diff)
    start.setHours(0,0,0,0)
    return start;
}
export const endOfWeek = (date: Date) =>{
    const day = date.getDay();
    const result = new Date(date);
    result.setDate(date.getDate() + (6 - day));
    result.setHours(23,59,59,999)
    return result;
}

export  const isSameDay = (d1: Date, d2: Date) =>
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate();
    

export const getCalendarGrid = (date:Date): Date[] =>{
    const year = date.getFullYear();
    const month = date.getMonth();

    const firstOfMonth = new Date(year, month, 1);
    const gridStart = startOfWeek(firstOfMonth);


    const totalDays = 42;

    const dates: Date[] = [];
    const current = new Date(gridStart);

    for(let i=0; i<totalDays; i++){
        dates.push(new Date(current));
        current.setDate(current.getDate()+1)
    }

    return dates;
}

