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
                
               
                return ( second.published_in -first.published_in)
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
    

    pContainer.textContent = ''
    info.forEach(element => {
        
    
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
                    <i onclick="displayModal('${element.id}')" class="fa-solid fa-arrow-right cursor-pointer"></i>
                   </div>
              </div>
            </div>
    
    `;

        pContainer.appendChild(div);
    });

    
}




const displayShowAllData = () => {
    loadData('tools',true)
}



const sortByDate = () => {
   
    
  loadData('tools','sort')
}



const displayModal = async (id) => {
      console.log(id);

      const res = await fetch(
        `https://openapi.programming-hero.com/api/ai/tool/${id}`
      );
        const data = await res.json();
        console.log(data.data);

      const modalContainer = document.getElementById('modal-container');

      const div = document.createElement('div');

      div.innerHTML = `
      
      <dialog id="my_modal_3" class="w-3/4">
          <form method="dialog" class="bg-slate-400 p-28 rounded-md">
            <button
              class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            >
              ✕
            </button>
            <div class="flex flex-col lg:flex-row">
              <div class="flex-1 space-y-6 border border-rose-600 p-6 rounded-md lg:mr-7">
                <p class="font-bold">
                  ChatGPT is an AI-powered chatbot platform that uses OpenAI's
                  GPT technology to simulate human conversation.
                </p>

                <div class="flex justify-between">
                  <p class="font-bold text-amber-600">$10/month Basic</p>
                  <p class="font-bold text-pink-600">$50/month Pro</p>
                  <p class="font-bold text-blue-700">Contact us Enterprise</p>
                </div>
                 
                  <div class="flex justify-between">
                      <div>
                         <h1 class="font-bold">Features</h1>
                         <ul class="list-disc">
                          <li>Customizable responses</li>
                          <li>Customizable responses</li>
                          <li>Customizable responses</li>
                         </ul>

                      </div>
                       
                      <div>
                        <h2 class="font-bold">Integrations</h2>
                        <ul class="list-disc">
                          <li>Fb messenger</li>
                          <li>Telegram</li>
                          <li>Telegram</li>
                        </ul>

                      </div>
                  </div>
              </div>

              <div class="flex-1">
                  <div class="relative">
                    <img src="./demo.jpg" alt="">
                     <p class="bg-red-500 p-3 rounded-md absolute top-2 right-2 text-white">94% accuracy</p>
                  </div>
                  <h1 class="font-bold text-center mt-3">Hi, how are you doing today?</h1>
                  <p class="text-center">I'm doing well, thank you for asking. How can I assist you today?</p>
              </div>
            </div>
          </form>
        </dialog>
      
      
      `;

      modalContainer.appendChild(div)

  const modalId = document.getElementById("my_modal_3");
  modalId.showModal();



}


loadData('tools');