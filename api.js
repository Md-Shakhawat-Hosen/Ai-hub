const loadData = async (tools,isShow) => {
        const res = await fetch(
          `https://openapi.programming-hero.com/api/ai/${tools}`
        );
        const data = await res.json();
        const info = data.data.tools

        console.log(data.data.tools[0]);
        
        if (isShow === 'sort') {

            for (let article of info) {
              // Split the date by the slash, resulting in an array of [ '03', '03', '2022' ], for example
              let dateArr = article.published_in.split("/");
              // Year, month, and day from the array. We subtract 1 from month, since months start counting from 0 in Javascript dates.
              let year = parseFloat(dateArr[2]);
              let month = parseFloat(dateArr[1]) - 1;
              let day = parseFloat(dateArr[0]);
              // Pass in the different components as year, month, day to get the valid date
              let articleDate = new Date(year, month, day);
             
              // Update the object
              article.published_in = articleDate;
            } 

            info.sort((first, second) => {
                
               
                return (first.published_in - second.published_in)
            });



            for (let article of info) {

            article.published_in = article.published_in.toLocaleDateString();
        }

        console.log(info);
       

       


}

 displayData(info, isShow);

}

const displayData = (info,isShow) => {
    // console.log(isShow)
    // console.log(info);
    
    

    console.log(info);

    let pContainer = document.getElementById('container');

    const showBtn = document.getElementById('show-btn');
    if (info.length > 6 && !isShow) {

        showBtn.classList.remove('hidden')

    }
    else {
       showBtn.classList.add("hidden");
    }

    if (!isShow) {
        info = info.slice(0, 6);
    }
     const arr = [];
    pContainer.textContent = ''
    info.forEach(element => {
        arr.push(element.published_in)
    
        let div = document.createElement("div");
         
        

        div.classList.add("card", "bg-base-100", "shadow-xl");

        div.innerHTML = `
     
       <figure>
              <img
                src="${element.image}"
                alt="No image found"
              />
            </figure>
            <div class="card-body">
              <h2 class="card-title">Features</h2>
               <ol>
                <li><span>1.</span> ${element.features[0]}</li>
                <li><span>1.</span> ${element.features[1]}</li>
                <li><span>1.</span> ${element.features[2]}</li>
                
                
               </ol>
               <hr>
              <div class="flex justify-between items-center">
                 <div>
                    <h2 class="font-bold">${element.name}</h2>
                     <div>
                        <i class="fa-regular fa-calendar"></i>
                        <span>${element.published_in}</span>
                     </div>
                    </div>
                   <div>
                    <i class="fa-solid fa-arrow-right cursor-pointer"></i>
                   </div>
              </div>
            </div>
    
    `;

        pContainer.appendChild(div);
    });

     console.log(arr)
}




const displayShowAllData = () => {
    loadData('tools',true)
}



const sortByDate = () => {
   
    
  loadData('tools','sort')
}




loadData('tools');