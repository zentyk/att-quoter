import { useCallback, useEffect, useState } from 'react'
import UseAdvice from './components/useAdvice'
import './App.css'

function App() {

  const [amount, setAmount] = useState(0)
  const [term, setTerm] = useState(12)
  const [plan, setPlan] = useState(299)
  const [phonePrice, setPhonePrice] = useState(0)
  const [showAdvice, setShowAdvice] = useState(false)
  
  /* TODO: MOVE THIS TO DATA LAYER*/
  const plans = [
    { id: 1, price: 299 }, 
    { id: 3, price: 399 },
    { id: 4, price: 499 },
    { id: 5, price: 599 },
    { id: 6, price: 699 },
    { id: 7, price: 799 },
    { id: 8, price: 899 },
    { id: 9, price: 999 },
    { id: 10, price: 1099 },
    { id: 11, price: 1199 },
    { id: 12, price: 1299 },
    { id: 13, price: 1499 },
  ]

  /* TODO: MOVE THIS TO DATA LAYER*/
  const plansWithDiscount =  [
    plans[4],
    plans[6],
    plans[7],
    plans[8],
    plans[9],
  ];
  
  /* TODO:  IMPROVE AND SEPARATE LAYOUT FROM LOGIC*/
  const CalculateAmount = useCallback(() => {
      if (plan <= 499) {
      setAmount(
        Math.floor((plan+30) + (phonePrice / term))
      );
    }  else {
      setAmount(
        Math.floor(
         (plan+50) + (phonePrice / term) 
        )
      );
    } 
  }, [plan, term, phonePrice]);

  useEffect(() => {
    CalculateAmount();
  }, [plan, term, phonePrice, CalculateAmount]);

  return (
    <> 
    <div className="card">
      <label htmlFor="selectedPlan">Plan</label>
      <select id="selectedPlan" onChange={(e) => {
        const selectedPlan = plans.find((plan) => plan.id === Number(e.target.value)); 
        if (selectedPlan) {
          setPlan(selectedPlan.price);
          CalculateAmount();
        }
        //if plan price is in plansWithDiscount, show advice
        const isDiscounted = plansWithDiscount.some((plan) => plan.price === selectedPlan?.price);
        if (isDiscounted) {
          console.log("hide advice")
          setShowAdvice(true)
          
        } else {
          console.log("show advice")
          setShowAdvice(false)
        }
      }}>
        {plans.map((plan) => (
          <option key={plan.id} value={plan.id}>
            ${plan.price}
          </option>
        ))}
      </select>

      <UseAdvice noDiscount={showAdvice} /> 

      <label htmlFor="term">Plazo</label>
      <select name="term" id="term" onChange={(e) => {
        const selectedTerm = Number(e.target.value);
        setTerm(selectedTerm);
        CalculateAmount();
      }}>
        <option value="12">12 meses</option>
        <option value="18" >18 meses</option>
        <option value="24">24 meses</option>
        <option value="36">36 meses</option>
        <option value="48">48 meses</option>
      </select>

      <label htmlFor="phonePrice">Precio del Equipo</label>
      <input type="number" id="phonePrice" onChange={(e)=>{ 
        setPhonePrice(e.target.valueAsNumber)
        CalculateAmount();
      }} />

      <label htmlFor="phonePlan">Total: ${amount}</label>

      <p>Antes de enviar la cotizacion revisa bien la disponibilidad, colores y precio del equipo</p>

      <input type="button" id="CopyQuotationBtn" value="Copiar Cotizacion" onClick={()=>{
        navigator.clipboard.writeText(`El telefono que usted ha elegido esta valorado en $${phonePrice} y el plan es de $${plan}+(control) por ${term} meses. El total sera de $${amount}.`)
        const copyQuotationBtn = document.getElementById("CopyQuotationBtn");
        if (copyQuotationBtn) {
          (copyQuotationBtn as HTMLInputElement).value = "Cotizacion Copiada!";
          setTimeout(() => {
            (copyQuotationBtn as HTMLInputElement).value = "Copiar Cotizacion";
          }, 2000);
        }
      }}/>
    </div>
    <br />
    <div className="card">
      <p>
        <p>Las cotizaciones ya incluyen <strong>Addon Control ($30 o $50 segun el plan)</strong></p>
        Disclaimer: Esta cotizacion es solo una referencia <strong>informativa</strong> y solo sirve para contratos con <strong>10 lineas o menos</strong>.
        <br />
        <br />  
        <strong>Este cotizador no es oficial y no tiene validez legal, siempre corrobora la cotizacion con tu mesa de ayuda.</strong>
        <br /> 
        <br />
        Por favor, revisa bien la disponibilidad, colores y precio del equipo antes de enviar la cotizacion.
        <br />
        <br />
        <strong>Hay algunos planes que ya no se ofrecen, verifica con tu mesa de ayuda si el plan que elegiste sigue disponible.</strong>
      </p>
    </div>

    <br />
      <div className="card">
        <p>Si tienes alguna duda, o detectaste algun error <a href="https://github.com/zentyk">contactame</a>.</p>
        <p>Pronto incluiremos mas mejoras</p>
        <p>Ultima actualizacion: <strong>4/26/2025</strong></p>
      </div>
    </>
  )
}

export default App