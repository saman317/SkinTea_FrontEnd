import { AuthedUserContext } from '../../App'
import React, {useContext, useEffect, useState, usedContext} from 'react'
import {useParams} from "react-router-dom"
import * as skinteaService from "../../services/skinteaService"
import CommentForm from '../CommentForm'
import {Link} from "react-router-dom"

const SkinteaDetails  = (props) => {
    const {id} = useParams();
    const [skintea, setSkintea]= useState(null);
    const user = useContext(AuthedUserContext);

    useEffect(()=>{
        const fetchSkintea = async () =>{
            const skintea = await skinteaService.showSkintea(id);
            setSkintea(skintea)

        }
        fetchSkintea()
    }, [id])

    if(!skintea) return <h1>......Tea to Come! </h1>
    console.log(skintea)
  
    return (
    <main>
        <header>
        <h1>{skintea.productName}</h1>
        <h2>{skintea.productType.toUpperCase()}</h2>
        <p>{skintea.recommendation}</p>
        <p>{skintea.pricePoint}</p>
         <p>{skintea.author.username} posted on { new Date(skintea.createdAt).toLocaleDateString()}</p>
            {skintea.author._id === user._id && (
                
                <>
                <Link to={`/skintea/${id}/edit`}>EDIT</Link>
                <button onClick={()=> props.handleDeleteSkintea(id)}>DELETE</button>
                </>
            )}
        </header>
        <section>
    <h2>Reviews</h2>
    <CommentForm skinteaId={id} />
    {!skintea.comments.length && <p>There are no reviews!</p>}
    {skintea.comments.map((comment) => {
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
  );
};

export default SkinteaDetails