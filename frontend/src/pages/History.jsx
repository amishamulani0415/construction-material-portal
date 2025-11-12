import React, { useEffect, useState } from 'react'
import { consumption } from '../api'

export default function History(){
  const [site, setSite] = useState('')
  const [materialType, setMaterialType] = useState('')
  const [period, setPeriod] = useState(30)
  const [rows, setRows] = useState([])

  const load = async () => {
    const data = await consumption({ site, materialType, period })
    setRows(data.results || [])
  }

  useEffect(()=>{ load() }, [])

  return (
    <div style={{padding:12}}>
      <h2>Consumption History</h2>
      <div style={{display:'flex', gap:8}}>
        <input placeholder="Site" value={site} onChange={e=>setSite(e.target.value)} />
        <select value={materialType} onChange={e=>setMaterialType(e.target.value)}>
          {['','CEMENT','SAND','AGGREGATE','STEEL','BRICKS','OTHER'].map(s=>(<option key={s} value={s}>{s||'Any material'}</option>))}
        </select>
        <input type="number" value={period} onChange={e=>setPeriod(e.target.value)} style={{width:100}}/>
        <button onClick={load}>Refresh</button>
      </div>

      <table style={{marginTop:12, width:'100%', borderCollapse:'collapse'}}>
        <thead>
          <tr><th style={{borderBottom:'1px solid #ccc', textAlign:'left'}}>Site</th>
              <th style={{borderBottom:'1px solid #ccc', textAlign:'left'}}>Material</th>
              <th style={{borderBottom:'1px solid #ccc', textAlign:'right'}}>Total Qty</th>
              <th style={{borderBottom:'1px solid #ccc', textAlign:'left'}}>Unit</th>
              <th style={{borderBottom:'1px solid #ccc', textAlign:'right'}}>Requests</th></tr>
        </thead>
        <tbody>
          {(rows||[]).map((r,i)=>(
            <tr key={i}>
              <td>{r._id.site}</td>
              <td>{r._id.materialType}</td>
              <td style={{textAlign:'right'}}>{r.totalQuantity}</td>
              <td>{r._id.unit}</td>
              <td style={{textAlign:'right'}}>{r.count}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
