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


const showSkintea= async (skinteaId)=>{
    try {
        const res = await fetch(`${BACKEND_URL}/skintea/${skinteaId}`, {
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

const create = async(formData)=>{
    try{
        const res = await fetch(`${BACKEND_URL}/skintea/`, {
            method: "POST",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
  
          });
          const {newSkintea }= await res.json();
          return newSkintea;
        

    }catch(err){
        console.log(err)

    }
}
export{ getSkintea, showSkintea, create };