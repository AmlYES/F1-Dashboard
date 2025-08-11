import React from 'react'
import "../styles.css";

type PaginationProps = {
    goToNext: () => void;
    goToPrev: () => void;
    hasNext?: boolean;
    hasPrev?: boolean;
};

export default function Pagination({goToNext, goToPrev, hasNext, hasPrev}: PaginationProps) {
  return (
    <div className='center'>
        <button className='btn btn-primary' disabled={!hasPrev} onClick={()=>goToPrev()}>PREV</button>
        <button className='btn btn-primary'  disabled={!hasNext} onClick={()=>goToNext()}>NEXT</button>
    </div>
  )
}
