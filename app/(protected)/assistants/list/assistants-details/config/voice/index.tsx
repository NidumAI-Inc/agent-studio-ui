// import AdditionalConfig from "./additional-config";
import Config from "./config";

type props = {
  id: string
}

function Voice({ id }: props) {
  return (
    <>
      <Config id={id} />
      {/* <AdditionalConfig id={id} /> */}
    </>
  )
}

export default Voice
