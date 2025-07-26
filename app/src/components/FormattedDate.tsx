import dayjs from 'dayjs'

interface FormattedDateProps {
  dateString: string
}

export default function FormattedDate({ dateString }: FormattedDateProps) {
  const obj = dayjs(dateString)
  const str = obj.format('MMMM D, YYYY')
  return <time dateTime={dateString}>{str}</time>
}