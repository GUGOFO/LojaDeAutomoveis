const btn = document.getElementById("bustar");
const divMarcas = document.getElementById("todasAsMarcas");
const divModelos = document.getElementById("divModelos");
const divDosCarros = document.getElementById("divDosCarros");

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
        divDosCarros.style.display = "none";

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
            })
        }

    }
    catch(error){
        console.error(error)
    }
}

