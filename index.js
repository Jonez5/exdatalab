// The breed selection input element.
const breedSelect = document.getElementById("breedSelect");
// The information section div element.
const infoDump = document.getElementById("infoDump");
// The progress bar div element.
const progressBar = document.getElementById("progressBar");
// The get favourites button element.
const getFavouritesBtn = document.getElementById("getFavouritesBtn");
const newHeader = document.getElementById("descrip");
// Step 0: Store your API key here for reference and easy access.
const API_KEY = "";









async function intialLoad() {
const retrieve = await axios.get ("https://api.thecatapi.com/v1/breeds");
    const arrdata = retrieve.data;
    console.log(arrdata)
    for( let e = 0; e < arrdata.length; e++) {
      let tag = document.createElement("option");
      tag.textContent = arrdata[e].name;
      tag.value = arrdata[e].id;
      breedSelect.append(tag);
      // tag.setAttribute("id",arrdata[e].id)
      // tag.innerHTML = arrdata[e].name
    }

}

intialLoad();


breedSelect.addEventListener("change", (event) => {
  progressBar.style.width = '0px'
  const breedID = event.target.value;
  const startTime = Date.now();
  console.log(startTime);
  axios
    .get(`https://api.thecatapi.com/v1/breeds/${breedID}`)
    .then((response) => {
      const endTime = Date.now();
      console.log(endTime);
      const timeTaken = endTime - startTime;
      console.log(`${timeTaken} milliseconds`);
      const breedDescrip = response.data.description;
      newHeader.textContent = breedDescrip;
      for (let res in response.data) {
        let pkey = document.createElement("p");
        let pVal = document.createElement("p");
        pkey.textContent = res;
        pkey.style.border = "solid black 1px";
        infoDump.appendChild(pkey);
        pVal.textContent = response.data[res];
        pVal.style.backgroundColor = "pink";
        infoDump.appendChild(pVal);
      }
    });
});
