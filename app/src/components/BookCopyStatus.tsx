import { useState } from 'react';
import { getBookCopyStatuses } from '../lib/utils';

interface BookCopyStatusProps {
  selectedId?: number
}

export default function BookCopyStatus({selectedId}: BookCopyStatusProps) {
  const statuses = getBookCopyStatuses();
  const [statusId, setStatusId] = useState(selectedId)

  return (
    <>
      <label className='sm:text-end'>Status:</label>
      <select name='status' value={statusId} required onChange={e => setStatusId(Number(e.target.value))}>
        <option>----- select -----</option>
        {statuses.map((status, index) => (
          <option key={index} value={index}>
            {status}
          </option>
        ))}
      </select>
    </> 
  )
}