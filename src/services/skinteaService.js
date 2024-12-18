const BACKEND_URL = import.meta.env.VITE_EXPRESS_BACKEND_URL;

const getSkintea= async ()=>{
    try {
        const res = await fetch(`${BACKEND_URL}/skintea`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },

        });
    const skintea = await res.json();
    console.log(skintea);
    return skintea;

    }catch(err){
        console.log(err, "Malfunction")
    }
}

export{ getSkintea };