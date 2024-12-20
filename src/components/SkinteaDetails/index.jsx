import React, {useEffect, useState} from 'react'
import {useParams} from "react-router-dom"
import * as skinteaService from "../../services/skinteaService"

const SkinteaDetails  = () => {
    const {id} = useParams()
    const [skintea, setSkintea]= useState(null)
    useEffect(()=>{
        const fetchSkintea = async () =>{
            const {foundTea} = await skinteaService.showSkintea(id);
            setSkintea(foundTea)

        }
        fetchSkintea()
    }, [id])

    if(!skintea) return <h1>......Tea to Come! </h1>
    console.log(skintea)
  
    return (
    <main>
        <header>
            <p>{skintea.productType.toUpperCase()}</p>
            <h1>{skintea.productName}</h1>
            <p>{skintea.author.username} posted on { new Date(skintea.createdAt).toLocaleDateString()}</p>
        </header>
        <section>
    <h2>Reviews</h2>
    {!skintea.comments.length && <p>There are no reviews!</p>}
    {skintea.comments.map((comment) => {
        console.log(comment);
        return (
            <article key={comment._id}>
                <header>
                    <p>
                        {comment.author.username} posted on 
                        {new Date(comment.createdAt).toLocaleDateString()}
                    </p>
                </header>
                <p>{comment.text}</p>
            </article>
        );
    })}
</section>
    </main>
  )
}

export default SkinteaDetails