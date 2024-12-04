export function parseDate(data: string) {

    return new Intl.DateTimeFormat('pt-BR').format(new Date(data)) 
}