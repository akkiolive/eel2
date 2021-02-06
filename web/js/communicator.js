

eel.expose(set_signal_list_all)
function set_signal_list_all(val) {
    console.log("set_signal_list_all is called in JS.")
    signal_list_all = val

    window.onload()
}

