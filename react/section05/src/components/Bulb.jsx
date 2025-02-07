import { useState } from 'react'; 

const Bulb = () => {
    const [light, setLight] = useState("OFF");

    return( 
        <div> 
            {light === 'ON'? (
                <div 
                    className="bulb" 
                    style={{ backgroundColor: "orange", color:"black" }}
                >ON</div> 
            ) : (
                <div 
                    className="bulb" 
                    style={{ backgroundColor: "#333", color:"white" }}
                >OFF</div>
            )} 

            <button onClick={()=>{
                    setLight(light === 'ON'? 'OFF':'ON');
                }}>
                    {light === 'ON'? '전구 끄기':'전구 켜기'}
            </button>
        </div>
    );
}

export default Bulb;