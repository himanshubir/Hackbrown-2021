const url = chrome.runtime.getURL('Menu/torchys_nutrition_information.json');
const imgurl = chrome.runtime.getURL("Menu/torchy's.png")
document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('button').addEventListener('click',
        onClick, false)

    function onClick() {
        chrome.tabs.query({currentWindow: true, active: true},
        function (tabs) {
            chrome.tabs.sendMessage(tabs[0].id, 'bears test 123', setCount)
        })
    }

    function setCount (res) {
        fetch(url)
            .then((response) => response.json())
            
            .then((json) => {
                
                const div2 = document.getElementById('button')
                div2.style.display = 'none'

                const div = document.createElement('div')
                menu_information = json[res.item.toString().toUpperCase()]
                div.innerHTML +=
                `
                <div style="height:200px;width:450px;align-content:center; margin:0;background-color: #b80610;">
                    <div style=  "position:absolute; align-content:center "> 
                        <img style="object-fit: scale-down;height:auto; max-width:95%; margin: 10px; " src=${imgurl}/>
                    </div>
                    <div style="height:85px; width:450px; padding-top:65px; display:flex; justify-content:center; align-items:center; position:relative; z-index:10;">
                        <div style="text-align:center; font-size: 40px"; font-family:Copperplate> ${menu_information['Calories']} Calories</div> 
                    </div>
                    <div style= "display:flex; z-index:10; align-content:center; justify-content:space-between; margin-left:20px; margin-right:20px; position:relative;">
                        <div style="align-content:center;">
                            <div style="text-align:center; font-size:18px">Protein</div>
                            <div style="text-align:center; ">${menu_information['Protein']} g</div>
                        </div>

                        <div style="align-content:center;">
                            <div style="text-align:center; font-size:18px;">Total Carbs</div>
                            <div style="text-align:center;">${menu_information['Total Carbs']} g</div>
                        </div>

                        <div style="align-content:center;">
                            <div style="text-align:center;font-size:18px;">Total Fat</div>
                            <div style="text-align:center;">${menu_information['Total Fat']} g</div>
                        </div>

                        <div style="align-content:center;">
                            <div style="text-align:center;font-size:18px;">Sodium</div>
                            <div style="text-align:center;">${menu_information['Sodium']} mg</div>
                        </div>
                    </div>

                </div>
                ` 

                document.body.appendChild(div)
            });
        
        
    }

}, false)

StyleSheet