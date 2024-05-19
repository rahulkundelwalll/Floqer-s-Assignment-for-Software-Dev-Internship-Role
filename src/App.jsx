import { useState } from 'react';
import MainTable from './component/MainTable';
import data from './data.json'
// import JobLineGraph from './component/JobLineGraph';
import SalaryLineGraph from './component/SalaryLineGraph';

function App() {


  return (
    <>
      <h1>Main Table</h1>
      <MainTable data={data} />
      {/* <JobLineGraph data={data}/> */}
      <SalaryLineGraph data={data}/>
       
    </>
  )
}

export default App
