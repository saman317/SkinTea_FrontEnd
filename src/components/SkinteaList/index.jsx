import React from 'react'
import {Link} from 'react-router-dom'

const SkinteaList = (props) => {
    console.log(props)
  return (
    
    <main  > 
        {props?.skintea.map(tea =>{
            return(
                <Link key={tea._id} to={`/skintea/${tea._id}`} >
                <article >
                    <header>
                    <h2>{tea.productName}</h2>
                    
                    <p>{tea.author.username} posted on{" "}
                         {new Date(tea.createdAt).toLocaleDateString()}
                    </p>
                    </header>

                    <p>{tea.productType}</p>
                   
                </article>
                </Link>
            )


        })}
    </main>
  )
}

export default SkinteaList