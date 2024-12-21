import { useState, useEffect } from "react";
import * as skinteaService from "../../services/skinteaService";
import { useNavigate, useParams } from "react-router-dom";
import './SkinteaNew.css';



const SkinteaForm = (props) => {
  const {id}= useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        productName: "",
        productType: "",
        recommendation: "",
        pricePoint: "",
    })

const handleChange = (evt) => {
        setFormData({ ...formData, [evt.target.name]: evt.target.value });
      };
    
      const handleSubmit = async (evt) => {
        evt.preventDefault();
        if(id){
          props.handleUpdateSkintea(id, formData)
        }else{
        const newSkintea = await skinteaService.create(formData);
        if (newSkintea) {
// addad a console log here to se if here are getting back the tea


console.log(newSkintea, "New tea here----------->")
          props.addNewSkintea(newSkintea);
          navigate("/skintea");
        }
      }};
      useEffect(()=>{
        const fetchSkintea = async () =>{
          const updatedTea = await skinteaService.showSkintea(id);
          setFormData(updatedTea?.foundTea);
        };
        if (id) fetchSkintea();
      }, [id]);
      
      return (
        <main>
          <form onSubmit={handleSubmit}>
            <h1>{id ? "Edit Tea" : "New Tea"}</h1>
            <label htmlFor="productName">Spill.The.Tea</label>
            <input
              required
              type= 'text'
              name="productName"
              id="productName"
              value={formData.productName}
              onChange={handleChange}
            />
            <label htmlFor="productType">ProductType</label>
            <select
              required
              name="productType"
              id="productType"
              value={formData.productType}
              onChange={handleChange}
            >
              <option value="">Select Type</option>
              <option value="Skincare">Skincare</option>
              <option value="Makeup">Makeup</option>
              <option value="Hair">Hair</option>
              
            </select>
            <label htmlFor="recommendation">Recommendation</label>
            <select
              required
              name="recommendation"
              id="recommendation"
              value={formData.recommendation}
              onChange={handleChange}
            >
              <option value="">Select Recommendation</option>
              <option value="Holy Grail">Holy.Grail</option>
              <option value="Gotta Have It ">Gotta.Have.It</option>
              <option value="Ehh">Ehh</option>
              <option value="Regift">Regift</option>
            </select>
            <label htmlFor="pricePoint">Pricepoint</label>
            <select
              required
              name="pricePoint"
              id="pricePoint"
              value={formData.pricePoint}
              onChange={handleChange}
            >
              <option value= "">Select Price</option>
              <option value="$">Affordable</option>
              <option value="$$">Luxury</option>
              <option value="$$$">Save Up</option>
              
            </select>
            <button type="submit">SUBMIT</button>
          </form>
        </main>
      );
    };
    

export default SkinteaForm;