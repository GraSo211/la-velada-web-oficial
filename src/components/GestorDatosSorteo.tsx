import { useEffect, useRef, useState, type ChangeEvent } from "react";
import "../styles/sorteo.css";
interface GestorDatosSorteoProps {
    obtenerCantGanadores: (cantGanadores: number) => void;
    obtenerArrayOpciones: (arrayOpciones: string[]) => void;
    obtenerArrayColores: (arrayColores: string[]) => void;
}

export default function GestorDatosSorteo({ obtenerCantGanadores, obtenerArrayOpciones, obtenerArrayColores }: GestorDatosSorteoProps) {
    const [texto, setTexto] = useState("");
    const [arrayOpciones, setArrayOpciones] = useState<string[]>([]);
    const [arrayColores, setArrayColores] = useState<string[]>([]);
    const listaOpciones = document.querySelector("ul");
    const inputOpcionRef = useRef<HTMLInputElement>(null);
    const colores = useRef<string[]>([]); 
    const handleText = (e: ChangeEvent<HTMLInputElement>) => {
        setTexto(e.currentTarget.value.toUpperCase());
    };

    const handleSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            handleClick();
        }
    };

    const handleClick = () => {
        //crear p para poner texto
        const p = document.createElement("p");
        const color = getRandomColor();
        const input = document.querySelector("input");
        const li = document.createElement("li");
        const arrayColoresMediador = [...arrayColores];
        const arrayOpcionesMediador = [...arrayOpciones];

        p.className = "p-5 ";
        p.style.backgroundColor = color;
        if (p) {
                if(arrayOpciones.includes(texto) || texto === "" || texto === " "){
                    const mensaje = document.getElementById("mensaje")
                    if(mensaje){
                        if(texto==="" || texto ===" ") mensaje.innerHTML = "Ingresa un valor!"
                        
                        if(arrayOpciones.includes(texto)) mensaje.innerHTML = "El valor ingresado ya existe!"
                        mensaje.classList.remove("hidden")
                        mensaje.classList.add("fade")
                    }
                    
                    return
                }
            
            p.textContent = texto;
        }
        
        arrayOpcionesMediador.push(texto);
        setArrayOpciones(arrayOpcionesMediador);

        
        arrayColoresMediador.push(color);
        setArrayColores(arrayColoresMediador);
        //crear li contenedor de p
        
        li.appendChild(p);
        listaOpciones?.appendChild(li);

        
        if (input) {
            input.value = "";
            setTexto("");
        }
        if (inputOpcionRef.current) inputOpcionRef.current.focus();
    };

    

    function hsvToRgb(h: number, s: number, v: number) {
        var r = 0,
            g = 0,
            b = 0;

        var i = Math.floor(h * 6);
        var f = h * 6 - i;
        var p = v * (1 - s);
        var q = v * (1 - f * s);
        var t = v * (1 - (1 - f) * s);

        switch (i % 6) {
            case 0:
                (r = v), (g = t), (b = p);
                break;
            case 1:
                (r = q), (g = v), (b = p);
                break;
            case 2:
                (r = p), (g = v), (b = t);
                break;
            case 3:
                (r = p), (g = q), (b = v);
                break;
            case 4:
                (r = t), (g = p), (b = v);
                break;
            case 5:
                (r = v), (g = p), (b = q);
                break;
        }

        return [r * 255, g * 255, b * 255];
    }

    function rgbToHex(c: number[]) {
        const r = Math.round(c[0]);
        const g = Math.round(c[1]);
        const b = Math.round(c[2]);
        return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
    }

    function colorDistance(c1: number[], c2: number[]) {
        return Math.sqrt(Math.pow(c1[0] - c2[0], 2) + Math.pow(c1[1] - c2[1], 2) + Math.pow(c1[2] - c2[2], 2));
    }

    function hexToRgb(hex:string) {
        const bigint = parseInt(hex.slice(1), 16);
        const r = (bigint >> 16) & 255;
        const g = (bigint >> 8) & 255;
        const b = bigint & 255;
        return [r, g, b];
    }

    function getRandomColor() {
        const threshold = 10;
        const numAzarHue = Math.random();
        const numAzarSat = Math.random() * 0.3 + 0.4;
        const numAzarVal = Math.random() * 0.1 + 0.9;
        const colorRgb = hsvToRgb(numAzarHue, numAzarSat, numAzarVal);
        const colorHex = rgbToHex(colorRgb);
        

        for (let col of colores.current) {
            const existingColorRgb = hexToRgb(col);
            if (colorDistance(colorRgb, existingColorRgb) < threshold) {
                return getRandomColor();
            }
        }
        
        colores.current.push(colorHex);
        return colorHex;
    }

    useEffect(() => {
        obtenerArrayColores(arrayColores);
    }, [arrayColores, obtenerArrayColores]);

    useEffect(() => {
        obtenerArrayOpciones(arrayOpciones);
    }, [arrayOpciones, obtenerArrayOpciones]);

    return (
        <div className="flex flex-col  gap-3 p-5 justify-center w-[33%] h-full  bg-[#121317] " id="gestorDatos">
            <div className="flex flex-col gap-3 h-[30%] items-center justify-center w-full">
                <h2 className="font-bold text-5xl text-center">SELECCIONA LA CANTIDAD DE GANADORES:</h2>
                <select
                    id="selectGanadores"
                    onChange={(e) => obtenerCantGanadores(parseInt(e.target.value))}
                    className="text-black font-bold w-full appearance-none p-3"
                >
                    <option value={1}>1 GANADOR</option>
                    <option value={2}>2 GANADORES</option>
                    <option value={3}>3 GANADORES</option>
                    <option value={4}>4 GANADORES</option>
                    <option value={5}>5 GANADORES</option>
                </select>
            </div>

            <div className="flex flex-col  items-center gap-5  w-full h-[80%]  ">
                <h2 className="font-bold text-5xl text-center  ">INGRESA LAS OPCIONES A SORTEAR:</h2>
                
                <div className="flex flex-row w-full ">
                    <input
                        ref={inputOpcionRef}
                        onChange={handleText}
                        onKeyDown={handleSubmit}
                        
                        placeholder="Escribe algo!"
                        className="text-black font-bold appearance-none p-3 w-[92%]"
                    />
                    <button onClick={handleClick} className="w-[8%] border border-white">
                        +
                    </button>
                </div>
                <div className="w-full overflow-scroll min-h-[80%] overflow-x-hidden">
                    <ul className="w-full  flex flex-col gap-5 pr-5 "></ul>
                </div>
            </div>
            
            
        </div>
    );
}
