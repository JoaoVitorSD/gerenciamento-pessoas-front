
export default function formatDate(value: string): string {
      if (!value) {
        return "";
      }
      let auxDate = new Date(value);
      let date = new Date(auxDate.getTime() + auxDate.getTimezoneOffset() * 60000);
      let formattedDateString = date.toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });

      return formattedDateString;
}
