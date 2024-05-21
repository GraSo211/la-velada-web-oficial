import { useState } from "react";
import GestorDatosSorteo from "../components/GestorDatosSorteo";
import GeneradorRuleta from "./GeneradorRuleta";

export default function RuletaAllSection() {
    const [cantGanadores, setCantGanadores] = useState(1);
    const [arrayOpciones, setArrayOpciones] = useState<string[]>([]);
    const [arrayColores, setArrayColores] = useState<string[]>([]);
    function obtenerCantGanadores(datos: number) {
        setCantGanadores(datos);
    }
    function obtenerArrayOpciones(arrayOpciones: string[]) {
        setArrayOpciones(arrayOpciones);
    }
    function obtenerArrayColores(arrayColores: string[]) {
        setArrayColores(arrayColores);
    }

    return (
        <div className="w-full h-full flex flex-row justify-center items-center">
            <GestorDatosSorteo obtenerCantGanadores={obtenerCantGanadores} obtenerArrayOpciones={obtenerArrayOpciones} obtenerArrayColores={obtenerArrayColores}></GestorDatosSorteo>
            <GeneradorRuleta cantGanadores={cantGanadores} arrayOpciones={arrayOpciones} arrayColores={arrayColores}></GeneradorRuleta>
        </div>
    );
}
