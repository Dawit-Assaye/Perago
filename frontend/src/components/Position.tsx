import axios from 'axios';
import { useState,useEffect } from 'react';

export default function Position() {

    useEffect(() => {
        axios.get()
            .then(res => {
                const data = await res.json();
                data.forEach((position) => {
                    dispatch(addPosition(position));
                });
            })
        .catch(err=>console.log(err))
    })

  return (
    <div>position</div>
  )
}
