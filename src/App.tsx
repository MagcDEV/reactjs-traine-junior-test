import { useEffect, useState } from "react"

interface MyApiDataFact {
  fact: string
  length: number
}

function App() {
  const [fact, setFact] = useState("")
  const [imageUrl, setImageUrl] = useState("")


  useEffect(() => {

    async function fetchData() {
      const factResp = await fetch('https://catfact.ninja/fact')
      const factData: MyApiDataFact = await factResp.json() as MyApiDataFact;

      setFact(factData.fact);

      const firstwords = factData.fact.split(" ").slice(0, 3).join(" ");

      const response = await fetch(`https://cataas.com/cat/says/${firstwords}`)
      setImageUrl(response.url)
    }

    void fetchData()
  
  }, [])
  

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      {fact && <h1 className="text-2xl font-bold">{fact}</h1>}
      {imageUrl && <img className="w-1/3 mt-2" src={imageUrl} alt="cats ramdom fact" />}
    </div>
  )
}

export default App
