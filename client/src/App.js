import React from 'react';
import Filter from '../src/Components/Filter/Filter'
import './App.css';

function App() {
  return (
    <div className="App">
     <p className="heading">Articles Dashboard</p>
      <div className='filter_section'>
         <div className='filter_section_part'>
            <Filter/>
         </div>
        
      </div>

    </div>
  );
}

export default App;
