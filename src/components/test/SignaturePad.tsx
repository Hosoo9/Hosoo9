// import Image from "next/image"
// import { useRef, useState } from "react"

// function SignaturePad() {
//   const [imageURL, setImageURL] = useState(null)
//   const [sign, setSign] = useState()
//   const [url, setUrl] = useState("")
//   const sigCanvas = useRef<any>({})

//   const handleClear = () => {
//     // if (sign !== undefined) {
//     //   sign.clear()
//     //   setUrl("")
//     // }
//   }
//   const handleGenerate = () => {
//     // setUrl(sign.getTrimmedCanvas().toDataURL("image/png"))
//   }

//   const save = () =>
//     setImageURL(sigCanvas.current.getTrimmedCanvas().toDataURL("image/png"))

//   return (
//     <div>
//       <SignaturePad
//         ref={sigCanvas}
//         canvasProps={{
//           className: "signatureCanvas",
//         }}
//       />
//       {/* Button to trigger save canvas image */}
//       <button onClick={save}>Save</button>
//       <button onClick={clear}>Clear</button>
//       <button onClick={close}>Close</button>
//       <br />
//       <br />
//       <Image alt="signature" src={url} />
//     </div>
//   )
// }
// export default SignaturePad
