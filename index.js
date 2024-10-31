/* index.js */

async function loadWASM()
{
    try
    {
        const response = await fetch("math.wasm");
        const bytes = await response.arrayBuffer();

        const {instance} = await WebAssembly.instantiate(bytes);

        return instance.exports;
    }

    catch (error)
    {
        console.error("Error loading wasm module: ", error);
    }
}


document.addEventListener(
    "DOMContentLoaded",

    async function(event)
    {
        const wasm_module = await loadWASM();

        if ( !wasm_module )
        {
            console.log("The wasm module either failed to load or was empty.")
            return;
        }
             

        const result = wasm_module.add(9, 10);
        console.log("added: ", result);
    }
);