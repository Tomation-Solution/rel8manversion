import { useEffect, useMemo, useState } from 'react';
import {useTable} from 'react-table'
// import { useAppDispatch, useAppSelector } from '../../redux/hooks';
// import { SelectListingForLandmark } from '../../redux/ListingForLandmark/ListingForLandmarkSlice';
// import { getUserOr404 } from '../../services/service.helper';
// import Preloader from '../Preloader/Preloder';
//from my expirence react-table does not blend well with typescript that why am using js
import {TableStyle} from './Table.style'
import MOCK_DATA from './mock.json';
import PropTypes from 'prop-types';



const Table = ({ prop_columns=[],custom_data=[]}) =>{
  // const user = getUserOr404()
  // const dispatch = useAppDispatch()
  // const { listings ,status} = useAppSelector(SelectListingForLandmark)
  // const [listings,setListings] = useState([])
  const columns = useMemo(()=>prop_columns,[])
  const data = useMemo(()=>custom_data,[custom_data])

  const  {
    getTableBodyProps,
    getTableProps,
    headerGroups,
    rows,
    prepareRow
  } = useTable({
    columns,data
  })

  const handleRowRoute = (id)=>{
    //this would send the page to a detail page
  }
  return(
    <div>
      {/* <Preloader loading={status==='pending'}/> */}
      <TableStyle {...getTableProps()} >
        <thead >
          {
            headerGroups.map((headerGroup,index)=>(
              <tr {...headerGroup.getHeaderGroupProps()} key={index}>
                {
                  headerGroup.headers.map((column,columnIndex)=>{
                    return (
                      <th {...column.getHeaderProps()} key={columnIndex}>{column.render('Header')}</th>  
                    )
                  })
                }
              </tr>

            ))
          }
        </thead>

        <tbody {...getTableProps()}>
          {
            rows.map((row,index)=>{
              let id = row.original.id

              prepareRow(row)
              return <tr {...row.getRowProps()} key={index} onClick={(e)=>handleRowRoute(id)}>
                {
                  row.cells.map((cell,cellIndex)=><td {...cell.getCellProps()} key={cellIndex}>{cell.render('Cell')}</td>)
                }
              </tr>
            })
          }                
        </tbody>
      </TableStyle>
    </div>
  )
}

Table.propTypes= {
  prop_columns:PropTypes.array,
  custom_data:PropTypes.array,
}


export default Table