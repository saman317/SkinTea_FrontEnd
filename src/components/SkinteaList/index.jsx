import React from 'react'

const SkinteaList = (props) => {
    console.log(props)
  return (
    <main>
        {props.skintea.map(tea =>{
            return(
                <Link key={tea.id} to={`/skintea/${tea._id}`} >
                <article >
                    <h3>{tea.productName}</h3>
                    <p>{tea.productType}</p>
                </article>
                </Link>
            )


        })}
    </main>
  )
}

export default SkinteaList