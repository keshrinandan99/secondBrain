
import Buttons from "./components/Buttons"
import Cards from "./components/Cards"
function App() {
  
  return (
    <>

      <Buttons />
      <div className="flex ">
      <Cards title="Aiml" contents="fasdfasfasf" tags={["productitvity","react"]} date="18th aug 2026" links="https://www.youtube.com/watch?v=32uTT424Nx4&list=RD32uTT424Nx4&start_radio=1" type="youtube" />
      <Cards title="Aiml" contents="fasdfasfasf" tags={["productitvity","react"]} date="18th aug 2026" links="https://x.com/AbhinavXJ/status/2108505931634163771" type="twitter" />
      <Cards title="Aiml" contents="fasdfasfasfdsffsfdsf" tags={["productitvity","react"]} date="18th aug 2026" links="https://x.com/AbhinavXJ/status/2108505931634163771" type="text" />
      </div>
     </>
  )
}

export default App
