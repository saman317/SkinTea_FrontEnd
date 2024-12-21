import { useState } from "react";
import * as skinteaService from "../../services/skinteaService";
import { useNavigate } from "react-router-dom";

const SkinteaForm = (props) => {
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
        console.log("formData", formData);
        // We'll update this function shortly...
        const newSkintea = await skinteaService.create(formData);
        if (newSkintea) {
          props.addNewSkintea(newSkintea);
          navigate("/skintea");
        }
      };
      return (
        <main>
          <form onSubmit={handleSubmit}>
            <label htmlFor="title-input">Spill.The.Tea</label>
            <input
              required
              type= 'text'
              name="productName"
              id="productName"
              value={formData.productName}
              onChange={handleChange}
            />
            <label htmlFor="productType-input">ProductType</label>
            <select
              required
              name="productType"
              id="productType-input"
              value={formData.productType}
              onChange={handleChange}
            >
              <option value="Skincare">Skincare</option>
              <option value="Makeup">Makeup</option>
              <option value="Hair">Hair</option>
              
            </select>
            <label htmlFor="recommendation-input">Recommendation</label>
            <select
              required
              name="recommendation"
              id="recommendation-input"
              value={formData.recommendation}
              onChange={handleChange}
            >
              <option value="Holy-Grail">Holy.Grail</option>
              <option value="Gotta-Have-It">Gotta.Have.It</option>
              <option value="Ehh">Ehh</option>
              <option value="Regift">Regift</option>
            </select>
            <label htmlFor="pricePoint-input">Pricepoint</label>
            <select
              required
              name="Pricepoint"
              id="pricePoint-input"
              value={formData.pricePoint}
              onChange={handleChange}
            >
              <option value="$">$</option>
              <option value="$$">$$</option>
              <option value="$$$">$$$</option>
              
            </select>
            <button type="submit">SUBMIT</button>
          </form>
        </main>
      );
    };
    

export default SkinteaForm