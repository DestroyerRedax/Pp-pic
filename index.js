import { useState } from "react";

export default function Home() {
  const [img, setImg] = useState(null);

  async function upload(e) {
    const file = e.target.files[0];
    const form = new FormData();
    form.append("image", file);

    const res = await fetch("/api/process", {
      method: "POST",
      body: form
    });

    const blob = await res.blob();
    setImg(URL.createObjectURL(blob));
  }

  return (
    <div style={{textAlign:"center",padding:"50px"}}>
      <h2>Auto Portrait Crop</h2>

      <input type="file" onChange={upload} />

      {img && (
        <div>
          <h3>Result</h3>
          <img src={img} width="300"/>
        </div>
      )}
    </div>
  );
}
