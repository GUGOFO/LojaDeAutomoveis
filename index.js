const divMarcas = document.getElementById("todasAsMarcas");
const divModelos = document.getElementById("divModelos");
const divCarros = document.getElementById("divDosCarros");
const divFundoEscondido = document.getElementById("fundoEscondido");
const btnSair = document.getElementById("voltarParaInicio");

getMarcas();

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
        divCarros.style.display = "none";

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
            fotoDoCarro.src = `./imgs/carros/carro${indexAleatorio}.png`;
            texto.textContent = nome;
            displayCarro.id = codigo;

            divDosCarros.appendChild(displayCarro);
            displayCarro.appendChild(fotoDoCarro);
            displayCarro.appendChild(texto);
        })      

        for(let carro of divDosCarros.children){
            carro.addEventListener("click", async clickado =>{
                let target;
                if(clickado.target.classList[0] != "displayCarro") target = clickado.target.parentElement;
                else target = clickado.target;
                console.log(target)
                const ano = target.id;
                getCarro(id, code, ano, carro.children[0].src);
            })
        } 

        divCarros.style.display = "flex";
    }
    catch(error){
        console.error(error);
    }
}

async function getCarro(id, code, year, src) {
    try{
        const resposta = await fetch(`https://fipe.parallelum.com.br/api/v2/cars/brands/${id}/models/${code}/years/${year}`)
        if(!resposta.ok) throw new Error("FODEU NO CARRO MENOOOO");
        const dados = await resposta.json();

        //Sim estou com preguiça de fazer logica com childElement muito obrigado passar bem ksaksa
        const divCarroEscolhido = document.getElementById("divCarroEscolhido");
        const fotoDoCarroEscolhido = document.getElementById("fotoDoCarroEscolhido")
        const marcaEscolhida = document.getElementById("marcaEscolhida")
        const combustivelEscolhido = document.getElementById("combustivelEscolhido")
        const eficienciaEscolhida = document.getElementById("eficienciaEscolhida")
        const modeloEscolhido = document.getElementById("modeloEscolhido")
        const anoEscolhido = document.getElementById("anoEscolhido")
        const precoAtualEscolhido = document.getElementById("precoAtualEscolhido")

        const { brand: marca,
                fuel: combustivel,
                fuelAcronym: eficiencia,
                model: modelo,
                modelYear: ano,
                price: preco,
        } = dados;

        console.log(dados)

        fotoDoCarroEscolhido.src = src;
        marcaEscolhida.innerHTML = `<b>Marca:</b> ${marca}`;
        combustivelEscolhido.innerHTML = `<b>Combustível:</b> ${combustivel}`;
        eficienciaEscolhida.innerHTML = `<b>Eficiência:</b> ${eficiencia}`;
        modeloEscolhido.innerHTML = `<b>Modelo:</b> ${modelo}`;
        anoEscolhido.innerHTML = `<b>Ano:</b> ${ano}`;
        precoAtualEscolhido.innerHTML = `<b>Preço atual:</b> ${preco}`;
        
        divFundoEscondido.style.display = "flex";
    }
    catch(error){
        console.log(error);
    }
}

btnSair.addEventListener("click", () => {
    divFundoEscondido.style.display = "none";
});