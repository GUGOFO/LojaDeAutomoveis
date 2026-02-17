
const btn = document.getElementById("oi");
btn.addEventListener("click", () => {
    getDados()
})

async function getDados() {
    try{
        const resposta = await fetch(`https://fipe.parallelum.com.br/api/v2/cars/brands/59/models/5940/years`)
        if(!resposta.ok) throw new Error("N ta Ok");

        const dados = await resposta.json();
        console.log(dados)
    }
    catch(error){
        console.error(error)
    }
}