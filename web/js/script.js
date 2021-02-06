signal_list_all = [
    "TOKYO_2020",
    "ROMA_2018"
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
            //set all non-selected if ctrl not pressed
            if (!key_pressed.Control){
              _tbody = e.target.parentElement.parentElement
              for(_row of _tbody.rows){
                _row.classList.remove("selected")
                console.log(_row)
              }
            }

            //set style of clicked row
            target_row = e.target
            index = target_row.parentElement.rowIndex
            index_clicked = index
            signal_list_all_selected[index] = !signal_list_all_selected[index]
            if(signal_list_all_selected[index]){
                target_row.classList.add("selected")
            }
            else{
                target_row.classList.remove("selected")
            }

            //if shift pressed
            if (key_pressed.shift){
              if(signal_list_all_lase_selected_index){

              }
            }
            //else if ctrl pressed
            else if (key_pressed.ctrl){

            }

            signal_list_all_lase_selected_index = index_clicked
            
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