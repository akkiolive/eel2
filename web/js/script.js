signal_list_all = [
    "TOKYO_2020",
    "ROMA_2018",
    "TOKO_2020",
    "TOYO_2020",
    "OKYO_2020",
]

signal_list_all_selected = []
signal_list_all_lase_selected_index = null


signal_list_plot = []

key_pressed = {
  ctrl: false,
  shift: false,
  alt: false
}

document.onkeydown = function(e){
  key_pressed[e.key] = true
}

document.onkeyup = function(e){
  key_pressed[e.key] = false
}



function refresh_table_signal_plot_all(){
    //get table
    table = document.getElementById("table_signal_list_all")
    
    //clear table
    tbodies = table.getElementsByTagName("tbody")
    for (tbody of tbodies){
        while(tbody.rows.length > 0){
            tbody.deleteRow(0)
        }
    }

    //add rows
    tbody = table.getElementsByTagName("tbody")[0]
    let row_cnt = 0
    for(signal_name of signal_list_all){
        row = tbody.insertRow(row_cnt)
        row.innerHTML = "<tr><td>" + signal_name + "</td></tr>"
        signal_list_all_selected.push(false)
        row_cnt += 1
    }

    //add event for multi selection
    for(row of tbody.rows){
        row.onclick = function(e){
            let _tbody = e.target.parentElement.parentElement
            target_row = e.target
            index_clicked = target_row.parentElement.rowIndex


            //if shift pressed
            if (key_pressed.Shift){
              if(signal_list_all_lase_selected_index != null){
                let last_idx = signal_list_all_lase_selected_index
                let click_idx = index_clicked
                if(last_idx < click_idx){
                  start_idx = last_idx
                  end_idx = click_idx
                }
                else{
                  start_idx = click_idx
                  end_idx = last_idx
                }
                for (let i=start_idx; i<=end_idx; i++){
                  signal_list_all_selected[i] = true
                  _tbody.rows[i].cells[0].classList.add("selected")
                }
              }
            }
            else{
              //set non-select if ctrl not pressed
              if (!key_pressed.Control){
                for (let idx in signal_list_all_selected){
                  if (idx != index_clicked){
                    signal_list_all_selected[idx] = false
                  }
                }
                for (let idx in signal_list_all_selected){
                  if (signal_list_all_selected[idx]){
                    _tbody.rows[idx].cells[0].classList.add("selected")
                  }
                  else{
                    _tbody.rows[idx].cells[0].classList.remove("selected")
                  }
                }
                
              }
              //set style of clicked row
              signal_list_all_selected[index_clicked] = !signal_list_all_selected[index_clicked]
              if(signal_list_all_selected[index_clicked]){
                target_row.classList.add("selected")
              }
              else{
                target_row.classList.remove("selected")
              }
            }
    


            signal_list_all_lase_selected_index = index_clicked
            console.log(signal_list_all_selected)

        }
    }

}   

window.onload = function(){
    refresh_table_signal_plot_all()

    document.getElementById("signal_search_box").oninput = 
    function(e){
      //get input text
      elem = document.getElementById("signal_search_box")
      input_text_tmp = elem.value.toUpperCase()
      input_text = "^" + input_text_tmp

      //create regexp search query
      if(input_text_tmp.indexOf("*") != -1){  
        input_text = "^"
        for (text of input_text_tmp.split("*")){
          input_text += ".*" + text
        }
      }
      input_text_reg = new RegExp(input_text, "i")

      
      if(input_text == ""){
        //search match signal and hide others
        table = document.getElementById("table_signal_list_all")

        for (row of table.rows){
          if(row.innerText in signal_list_plot)
            row.hidden = true
          else
            row.hidden = false
        }
      }
      else{
        //search match signal and hide others
        table = document.getElementById("table_signal_list_all")
        for (row of table.rows){
          if(row.innerText in signal_list_plot){
            row.hidden = true
          }
          else if(input_text_reg.exec(row.innerText)){
            row.hidden = false
          }
          else{
            row.hidden = true
          }
        }
      }


    }



}