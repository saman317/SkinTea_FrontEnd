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
          const {skintea} = await res.json();
          console.log(skintea)
          return skintea;
        

    }catch(err){
        console.log(err)

    }
}


const createComment = async (formData, postId) => {
    try {
      const res = await fetch(`${BACKEND_URL}/skintea/${postId}/comments`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const { newComment } = await res.json();
      return newComment;
    } catch (error) {
      console.log(error);
    }
  };

const deletedSkintea = async (id) => {
    try {
      const res = await fetch(`${BACKEND_URL}/skintea/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      return res.json();
    } catch (error) {
      console.log(error);
    }
  };


const updateSkintea= async(id, skinteaFormData)=>{
    try{
        const res = await fetch(`${BACKEND_URL}/skintea/${id}`, {
            method: 'PUT',
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(skinteaFormData),
          });
          return await res.json();

    }catch(error){
        console.log(error)


    }
}

    
export{ getSkintea,showSkintea,create, createComment, deletedSkintea, updateSkintea};