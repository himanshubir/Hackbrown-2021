const url = chrome.runtime.getURL("Menu/torchys_nutrition_information.json");
const imgurl = chrome.runtime.getURL("Menu/torchys_logo.png");
document.addEventListener(
  "DOMContentLoaded",
  function () {
    document.querySelector("button").addEventListener("click", onClick, false);

    function onClick() {
      chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, "", setCount);
      });
    }

    // onClick();

    function setCount(res) {
      const div = document.createElement("div");
      if (res.item === undefined) {
        div.innerHTML = `<div style="height:200px;width:450px;align-content:center;vertical-align:middle;text-align:center;">
            <div style="position: relative;top: 50%;transform: translateY(-50%);font-size:30px;">Please select a menu item.</div>
        </div>`;
      } else {
        fetch(url)
          .then((response) => response.json())
          .then((json) => {
            menu_information = json[res.item.toString().toUpperCase()]; // get corresponding menu item
            div.innerHTML = `
            <div style="height:200px;width:450px;align-content:center; margin:0;background-color: #e6434c;">
                <div style=  "position:absolute; align-content:center "> 
                    <img style="object-fit: scale-down;height:auto; max-width:95%; margin: 10px; " src="${imgurl}"/>
                </div>
                <div style="height:85px; width:450px; padding-top:65px; display:flex; justify-content:center; align-items:center; position:relative; z-index:10;">
                    <div style="text-align:center; font-size: 40px; font-family:Copperplate"> ${menu_information["Calories"]} Calories</div> 
                </div>
                <div style= "display:flex; z-index:10; align-content:center; justify-content:space-between; margin-left:20px; margin-right:20px; position:relative;">
                    <div style="align-content:center;">
                        <div style="text-align:center; font-size:20px">Protein</div>
                        <div style="text-align:center; font-size:16px">${menu_information["Protein"]} g</div>
                    </div>

                    <div style="align-content:center;">
                        <div style="text-align:center; font-size:20px;">Total Carbs</div>
                        <div style="text-align:center; font-size:16px">${menu_information["Total Carbs"]} g</div>
                    </div>

                    <div style="align-content:center;">
                        <div style="text-align:center; font-size:20px;">Total Fat</div>
                        <div style="text-align:center; font-size:16px">${menu_information["Total Fat"]} g</div>
                    </div>

                    <div style="align-content:center;">
                        <div style="text-align:center; font-size:20px;">Sodium</div>
                        <div style="text-align:center; font-size:16px">${menu_information["Sodium"]} mg</div>
                    </div>
                </div>

            </div>
            `;
          });
      }
      document.getElementById("button").style.display = "none";
      document.body.appendChild(div);
    }
  },
  false
);

StyleSheet;