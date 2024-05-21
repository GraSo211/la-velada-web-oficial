import { useEffect } from "react";
import Ruleta from "../components/Ruleta";

interface GeneradorRuletaProps {
    cantGanadores: number;
    arrayOpciones: string[];
    arrayColores: string[];
}
interface RuletaObject {
    arrayOpciones: string[];
    arrayColores: string[];
    nroGanador: number;
    nombreGanador: string;
}

export default function GeneradorRuleta({ cantGanadores, arrayOpciones, arrayColores }: GeneradorRuletaProps) {
    const ruletas: RuletaObject[] = [];

    for (let i = 0; i < cantGanadores; i++) {
        const nroGanador: number = Math.floor(Math.random() * arrayOpciones.length);
        const colorDelGanador: string = arrayColores[nroGanador];
        const nombreGanador: string = arrayOpciones[nroGanador];
        ruletas.push({ arrayOpciones: arrayOpciones, arrayColores: arrayColores, nroGanador: nroGanador, nombreGanador: nombreGanador });
        arrayOpciones = arrayOpciones.filter((elem) => elem !== nombreGanador);
        arrayColores = arrayColores.filter((elem) => elem !== colorDelGanador);
    }

    const animacionEnd = () => {
        const mensaje = document.getElementById("mensaje");
        if (mensaje) {
            mensaje.classList.remove("fade");
            mensaje.classList.add("hidden");
        }
    };

    useEffect(() => {
        for (let i = 0; i < cantGanadores; i++) {
            if (i !== 0) {
                const canvas = document.getElementById("ruleta" + i);
                canvas?.classList.add("ruleta");
            }
        }
    }, [arrayOpciones, cantGanadores]);

    const handleClick = () => {
        const gestorDatos = document.getElementById("gestorDatos")
        gestorDatos?.classList.add("pointer-events-none")
        for (let i = 0; i < cantGanadores; i++) {
            const canvas = document.getElementById("ruleta" + i);
            const tiempoDelay: number = i * 5000;
            const tiempoGanador: number = (i + 1) * 5000;
            const spanGanador = document.getElementById("ganador" + i);

            setTimeout(() => {
                canvas?.classList.add("girar-ruleta");
                canvas?.classList.remove("ruleta");
            }, tiempoDelay);
            setTimeout(() => {
                spanGanador?.classList.remove("hidden");
            }, tiempoGanador);
        }
    };

    return (
        <div className="h-full  w-[67%] flex flex-col justify-center relative items-center  gap-5  ">
            <div className="h-full  w-full flex  flex-wrap justify-center items-center  gap-5 ">
                {ruletas.map((ruleta, index) => (
                    <Ruleta
                        key={index}
                        id={`${index}`}
                        arrayOpciones={ruleta.arrayOpciones}
                        arrayColores={ruleta.arrayColores}
                        nroGanador={ruleta.nroGanador}
                        nombreGanador={ruleta.nombreGanador}
                    ></Ruleta>
                ))}
            </div>

            <button id="boton" className="text-white font-bold text-2xl mb-10 border border-white w-[95%] h-20" onClick={handleClick}>
                click
            </button>
            <span
                id="mensaje"
                onAnimationEnd={animacionEnd}
                className="w-full h-full absolute grid place-content-center bg-black rounded-md font-bold text-7xl  backdrop-blur bg-opacity-50 transition-transform hidden z-50 "
            >
            </span>
        </div>
    );
}
