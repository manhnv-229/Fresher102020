  /**
   * -----------------------------------------
   * Tạo các function xử lí form alert success
   * createdBy: NTDong(20/11/2020)
   */

  
       const alertBox=document.querySelector(".alert-box");
       let timer;
       //showAlertBox();
       function showAlertBox(){
          alertBox.classList.remove("hide");
          alertBox.classList.add("show");
          // hide animation onload 
          if(alertBox.classList.contains("hidden")){
              alertBox.classList.remove("hidden");
          }
          timer=setTimeout(function(){
              hideAlertBox();
          },3000)
       }
        
       function hideAlertBox(){
          alertBox.classList.remove("show");
          alertBox.classList.add("hide");
       }    