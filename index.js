const btn = document.getElementById("bustar");
const divMarcas = document.getElementById("todasAsMarcas");
const divModelos = document.getElementById("divModelos");
const divCarros = document.getElementById("divDosCarros");

btn.addEventListener("click", () => {
    getMarcas();
})

async function getMarcas() {
    try{
        const resposta = await fetch(`https://fipe.parallelum.com.br/api/v2/cars/brands`)
        if(!resposta.ok) throw new Error("N ta Ok");

        const marcas = await resposta.json();
        divMarcas.innerHTML = "";
        divModelos.style.display = "none";
        divCarros.style.display = "none";

        marcas.forEach(marca => {
            const { code: codigo, name: nome} = marca;

            const btnMarca = document.createElement("div");
            btnMarca.classList.add("botao");
            btnMarca.classList.add("marca");
            btnMarca.textContent = nome;
            btnMarca.id = codigo

            divMarcas.appendChild(btnMarca);
        })
        for(btnMarca of divMarcas.children){
            btnMarca.addEventListener("click", async clickado =>{
                console.log(clickado);
                for(const botaodamarca of divMarcas.children)
                    if(botaodamarca.classList[0] == "botaoClickado")  botaodamarca.classList.replace("botaoClickado", "botao");
                clickado.target.classList.replace("botao", "botaoClickado");
                
                getModelos(clickado.target.id);
            })
        }

    }
    catch(error){
        console.error(error)
    }
}

async function getModelos(id) {
    try{
        const resposta = await fetch(`https://fipe.parallelum.com.br/api/v2/cars/brands/${id}/models`);

        if(!resposta.ok) throw new Error("FODEU DE VEZ NO MODELOS")
        const modelos = await resposta.json();

        const divDosModelos = document.getElementById("todosOsModelos");
        divDosModelos.innerHTML = "";

        modelos.forEach(modelo => {
            const { code: codigo, name: nome } = modelo;

            const btnModelo = document.createElement("div");
            btnModelo.classList.add("botao");
            btnModelo.classList.add("modelo");
            btnModelo.textContent = nome;
            btnModelo.id = codigo;

            divDosModelos.appendChild(btnModelo)
        })

        
        for(btnModelo of divDosModelos.children){
            btnModelo.addEventListener("click", async clickado =>{
                console.log(clickado);
                for(const botaodoModelo of divDosModelos.children)
                    if(botaodoModelo.classList[0] == "botaoClickado")  botaodoModelo.classList.replace("botaoClickado", "botao");
                clickado.target.classList.replace("botao", "botaoClickado");

                getTipos(id, clickado.target.id);
            })
        }

        divModelos.style.display = "flex";
    
    }
    catch(error){
        console.error(error)
    }
}

async function getTipos(id, code) {
    try{
        const resposta = await fetch(`https://fipe.parallelum.com.br/api/v2/cars/brands/${id}/models/${code}/years`);
        if(!resposta.ok) throw new Error("FODEU NOS TIPOS MENO");
        const carros = await resposta.json();

        const divDosCarros = document.getElementById("displayCarros");
        divDosCarros.innerHTML = "";

        carros.forEach(carro => {
            const { code: codigo, name: nome } = carro;

            const displayCarro = document.createElement("div");
            const fotoDoCarro = document.createElement("img");
            const texto = document.createElement("p");

            displayCarro.classList.add("displayCarro");
            fotoDoCarro.classList.add("fotoDoCarro");
            texto.classList.add("texto");

            const indexAleatorio = Math.floor(Math.random() * 16);
            fotoDoCarro.src = `imgs/carros/carro${indexAleatorio}.png`;
            texto.textContent = nome;
            displayCarro.id = codigo;

            divDosCarros.appendChild(displayCarro);
            displayCarro.appendChild(fotoDoCarro);
            displayCarro.appendChild(texto);
        })      

        for(displayCarro of divDosCarros.children){
            displayCarro.addEventListener("click", async clickado =>{
                
            })
        } 

        divCarros.style.display = "flex";
    }
    catch(error){
        console.error(error);
    }
}

async function getCarro(params) {
    
}