import React, { useEffect, useRef } from "react";
import "../styles/sorteo.css";

interface RuletaProps {
    id: string;
    arrayOpciones: string[];
    arrayColores: string[];
    nroGanador: number;
    nombreGanador: string;
}


export default function Ruleta({ id, arrayOpciones, arrayColores, nroGanador, nombreGanador }: RuletaProps) {
    const ruletaRef = useRef<HTMLCanvasElement>(null);
    
    const anguloInicialGanador = (360 / arrayOpciones.length) * nroGanador;
    const anguloFinalGanador = anguloInicialGanador + 360 / arrayOpciones.length;
    const anguloGanador = nroGanador * (360 / arrayOpciones.length);
    const diferencia = anguloFinalGanador - anguloInicialGanador;
    const centrador = diferencia / 2 - 30;
    

    let nroAleatorizarVuelta = Math.floor(Math.random()*((diferencia/2)-1));
    const nroAleatorizarSigno = Math.floor(Math.random()*2);
    if(nroAleatorizarSigno === 0){
        nroAleatorizarVuelta = -nroAleatorizarVuelta
    }
    const vueltas = 360 * 20 - 120 - anguloGanador - centrador + nroAleatorizarVuelta;
    
    const vueltasProperty: string = vueltas + "deg";
    useEffect(() => {
        if (ruletaRef.current) {
            ruletaRef.current.style.setProperty("--giro", vueltasProperty);
        }
    }, [vueltasProperty]);

   
    function creadorSorteo(id: string, posicionX: number, posicionY: number, radio: number, arrayOpciones: string[], arrayColores: string[]) {
     
        const canvas = document.getElementById("ruleta" + id) as HTMLCanvasElement;
        const ctx = canvas?.getContext("2d");
        if (ctx) {
            let anguloFinalInicial = 0;
         
            for (let i = 0; i < arrayOpciones.length; i++) {
                const anguloInicio = anguloFinalInicial;
                const anguloFinal = ((360 / arrayOpciones.length) * (i + 1) * Math.PI) / 180;
                anguloFinalInicial = anguloFinal;

                ctx.beginPath();
                const color: string = arrayColores[i];
                
                ctx.fillStyle = color;
                
                ctx.arc(posicionX, posicionY, radio, anguloInicio, anguloFinal);
                
                ctx.lineTo(posicionX, posicionY);
                
                ctx.fill();
            }
        }
    }

  
    useEffect(() => {
        creadorSorteo(id, 225, 225, 210, arrayOpciones, arrayColores);
    }, [arrayOpciones]);

    return (
        <div
            className="flex flex-col p-3 relative justify-center items-center after:absolute after:top-[7px] after:z-10 after:left-[calc(50%-32px)] after:border-t-white after:border-l-transparent after:border-r-transparent after:border-l-[32px] after:border-r-[32px] after:border-t-[46px] after:content-[''] before:absolute before:top-[6px] before:z-10 before:left-[calc(50%-35px)] before:border-t-gray-500 before:border-l-transparent before:border-r-transparent before:border-l-[35px] before:border-r-[35px] before:border-t-[50px] before:content-['']"
            id="contenedor-ruleta"
        >
            <canvas width="450" height="450" id={"ruleta" + id} ref={ruletaRef} className="rounded-full bg-gray-300 "></canvas>
            <span id={"ganador" + id} className="text-center text-black text-5xl font-bold absolute hidden">
                {nombreGanador}
            </span>
        </div>
    );
}
