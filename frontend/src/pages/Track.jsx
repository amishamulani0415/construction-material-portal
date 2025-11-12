import React, { useState } from 'react'
import { listRequests } from '../api'

export default function Track(){
  const [site, setSite] = useState('')
  const [status, setStatus] = useState('')
  const [items, setItems] = useState([])

  const search = async () => {
    const data = await listRequests({ site, status })
    setItems(data)
  }

  return (
    <div style={{padding:12}}>
      <h2>Track Requests</h2>
      <div style={{display:'flex', gap:8}}>
        <input placeholder="Site" value={site} onChange={e=>setSite(e.target.value)} />
        <select value={status} onChange={e=>setStatus(e.target.value)}>
          {['','PENDING','APPROVED','REJECTED','DISPATCHED','DELIVERED'].map(s=>(<option key={s} value={s}>{s||'Any status'}</option>))}
        </select>
        <button onClick={search}>Search</button>
      </div>
      <div style={{marginTop:12}}>
        {items.map(it => (
          <div key={it._id} style={{border:'1px solid #ddd', padding:10, marginBottom:8}}>
            <div><b>{it.materialType}</b> — {it.quantity} {it.unit} @ {it.site}</div>
            <div>Status: {it.status} | Requested By: {it.requestedBy}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
