
import React from 'react'
import ProblemDescription from './ProblemDescription/ProblemDescription'
import Playground from './Playground/Playground'

const Workspace = ({ description, testcases, answers, category, difficulty, title }) => {
  return (
    <div className='flex w-full'>
        <ProblemDescription title={title} description={description} difficulty={difficulty} category={category}/>
        <Playground testCases={testcases} answers={answers} />
    </div>
  )
}

export default Workspace