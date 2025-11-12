import React, { useEffect, useState } from 'react'
import { pendingSummary } from '../api'

export default function Summary(){
  const [rows, setRows] = useState([])

  const load = async () => {
    const data = await pendingSummary()
    setRows(data)
  }

  useEffect(()=>{ load() }, [])

  return (
    <div style={{padding:12}}>
      <h2>Pending Request Summary</h2>
      <table style={{marginTop:12, width:'100%', borderCollapse:'collapse'}}>
        <thead>
          <tr><th style={{borderBottom:'1px solid #ccc', textAlign:'left'}}>Site</th>
              <th style={{borderBottom:'1px solid #ccc', textAlign:'left'}}>Material</th>
              <th style={{borderBottom:'1px solid #ccc', textAlign:'left'}}>Status</th>
              <th style={{borderBottom:'1px solid #ccc', textAlign:'right'}}>Count</th></tr>
        </thead>
        <tbody>
          {(rows||[]).map((r,i)=>(
            <tr key={i}>
              <td>{r._id.site}</td>
              <td>{r._id.materialType}</td>
              <td>{r._id.status}</td>
              <td style={{textAlign:'right'}}>{r.count}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
