export const dateFilter = {
    filterDate(date) {
        let options = {
            hour: 'numeric',
            minute: 'numeric',
        }
        return Intl.DateTimeFormat('RU-ru', options).format(date)
    }
}