import { useState } from 'react';
import { getBookStatuses } from '../lib/api';

interface BookStatusProps {
  selectedId?: number
}

export default function BookStatus({selectedId}: BookStatusProps) {
  const statuses = getBookStatuses();
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