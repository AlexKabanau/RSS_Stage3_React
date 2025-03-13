import React from 'react'
import {SubmitFormDataType} from '../store/reducers/dataSlice'

function Item({ key, item }: {key: number, item: SubmitFormDataType}) {
  return (
    <div key={key} className="data-item">
              {JSON.stringify(item)}
            </div>
  )
}

export default Item